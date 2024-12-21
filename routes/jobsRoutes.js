import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import errorMiddleware from "../middlewares/errorMiddleware.js";

import {
  createJobController,
  updateJobController,
  getAllJobsController,
  deleteJobController,
  jobStatsController, // Combine all imports in one destructured object
} from "../controllers/jobsController.js";

const router = express.Router();

// Routes
// Create job || POST
router.post("/create-job", userAuth, createJobController);

// Get jobs || GET
router.get("/get-job", userAuth, getAllJobsController);

// Update job || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// delete job || delete
router.delete("/delete-job/:id", userAuth, deleteJobController);

// job stats filter || GET
router.get("/job-stats", userAuth, jobStatsController);

//error mid use
router.use(errorMiddleware);

export default router;
