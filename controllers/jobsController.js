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
      return res.status(400).json({
        message: "Please provide all the required fields",
      });
    }

    // Fetch the job by ID
    const job = await jobsModel.findById(id);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({
        message: `Job not found with id ${id}`,
      });
    }

    // Guard against missing `createdBy`
    if (!job.createdBy) {
      return res.status(500).json({
        message: "Job does not have a creator associated",
      });
    }

    // Authorization check
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to update this job",
      });
    }

    // Update the job
    const updatedJob = await jobsModel.findByIdAndUpdate(
      id,
      { company, position },
      { new: true, runValidators: true }
    );

    // Response
    res.status(200).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};
