import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  updateJobController,
} from "../controllers/jobsController.js";
import getAllJobsController from "./jobsRoutes";

const router = express.Router();

//routes
// create job||post
router.post("/create-job", userAuth, createJobController);

//get jobs||get
router.get("/get-job", userAuth, getAllJobsController);

//update jobs ||put ||patch
router.patch("/update-job/:id", userAuth, updateJobController);

export default router;
