import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";

// Create jobs
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      return next("Please provide all the fields");
    }

    req.body.createdBy = req.user.userId;

    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// Get jobs
export const getAllJobsController = async (req, res, next) => {
  try {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });

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

    // Fetch the job by ID
    const job = await jobsModel.findById(id);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: `Job not found with id ${id}` });
    }

    // Authorization check: Ensure the job was created by the logged-in user
    if (job.userId !== req.user.userId) {
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
    // Pass the error to the error-handling middleware
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
    if (job.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }
    // Delete the job
    await jobsModel.findByIdAndDelete(id);
    // Response with success message
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};

// Job stats filter
export const jobStatsController = async (req, res, next) => {
  try {
    const stats = await jobsModel.aggregate([
      {
        $match: { createdBy: req.user.userId },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    //default stats
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview: stats.interview || 0,
    };

    //monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: req.user.userId,
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

    res
      .status(200)
      .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
  } catch (error) {
    next(error);
  }
};
