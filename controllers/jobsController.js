import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// Create jobs
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      return next("Please provide all the fields");
    }

    req.body.createdBy = req.user.userId; // Assign the logged-in user's ID to createdBy

    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// Get jobs
export const getAllJobsController = async (req, res, next) => {
  try {
    // Find jobs and populate the createdBy field with the user details
    const jobs = await jobsModel
      .find({ createdBy: req.user.userId })
      .populate("createdBy"); // Populate the createdBy field with the full user details

    res.status(200).json({
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Update jobs
export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the job ID from the request parameters
    const { company, position } = req.body; // Extract fields from the request body

    // Validation for required fields
    if (!company || !position) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Fetch the job by ID and populate the createdBy field if needed
    const job = await jobsModel.findById(id).populate("createdBy");

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: `Job not found with id ${id}` });
    }

    // Authorization check: Ensure the job was created by the logged-in user
    if (job.createdBy._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }

    // Update the job with the new data
    const updatedJob = await jobsModel.findByIdAndUpdate(
      id,
      { company, position }, // Fields to update
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the new fields against the schema
      }
    );

    // Response with the updated job
    res.status(200).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

// Delete jobs
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the job ID from the request parameters

    // Fetch the job by ID
    const job = await jobsModel.findById(id);
    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: `Job not found with id ${id}` });
    }
    // Authorization check: Ensure the job was created by the logged-in user
    if (job.createdBy.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }
    // Delete the job
    await jobsModel.findByIdAndDelete(id);
    // Response with success message
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Job stats filter
export const jobStatsController = async (req, res, next) => {
  try {
    const stats = await jobsModel.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Default stats
    const defaultStats = {
      pending: stats.find((stat) => stat._id === "pending")?.count || 0,
      reject: stats.find((stat) => stat._id === "reject")?.count || 0,
      interview: stats.find((stat) => stat._id === "interview")?.count || 0,
    };

    // Monthly stats
    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    monthlyApplication = monthlyApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();

    res
      .status(200)
      .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
  } catch (error) {
    next(error);
  }
};
