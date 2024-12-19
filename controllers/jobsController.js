import jobsModel from "../models/jobsModel.js";

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
    const { id } = req.params;
    const { company, position } = req.body;

    // Validation
    if (!company || !position) {
      return next("Please provide all the fields");
    }

    // Find job
    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
      return next(`Job not found with id ${id}`);
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return next("You are not authorized to update this job");
    }

    const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    // Response
    res.status(200).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};
