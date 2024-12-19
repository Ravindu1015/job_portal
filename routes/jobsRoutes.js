import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  updateJobController,
  getAllJobsController, // Combine all imports in one destructured object
} from "../controllers/jobsController.js";

const router = express.Router();

// Routes
// Create job || POST
router.post("/create-job", userAuth, createJobController);

// Get jobs || GET
router.get("/get-jobs", userAuth, getAllJobsController);

// Update job || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

export default router;
