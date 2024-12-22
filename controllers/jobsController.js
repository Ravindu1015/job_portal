import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// Create Job Controller
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

// Get All Jobs Controller
export const getAllJobsController = async (req, res, next) => {
  try {
    const jobs = await jobsModel
      .find({ createdBy: req.user.userId })
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Update Job Controller
export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await jobsModel.findById(id).populate("createdBy");

    if (!job) {
      return res.status(404).json({ message: `No job found with id ${id}` });
    }

    if (job.createdBy._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job" });
    }

    const updatedJob = await jobsModel.findByIdAndUpdate(
      id,
      { company, position },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, updatedJob });
  } catch (error) {
    next(error);
  }
};

// Delete Job Controller
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await jobsModel.findById(id);

    if (!job) {
      return res.status(404).json({ message: `No job found with id ${id}` });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this job" });
    }

    await jobsModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Job Statistics Controller
export const jobStatsController = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const stats = await jobsModel.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
    };

    stats.forEach((stat) => {
      defaultStats[stat._id] = stat.count;
    });

    let monthlyApplication = await jobsModel.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    monthlyApplication = monthlyApplication.map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment(`${year}-${month}-01`).format("MMM YYYY");
      return { date, count };
    });

    res.status(200).json({
      success: true,
      totalJobs: stats.length,
      defaultStats,
      monthlyApplication,
    });
  } catch (error) {
    next(error);
  }
};
