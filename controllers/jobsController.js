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
    if (job.createdBy.toString() !== req.user.userId) {
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
