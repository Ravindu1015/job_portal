import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController } from "../controllers/jobsController.js";

const router = express.Router();

//routes
// create job||post
router.post("/create-job", userAuth, createJobController);

//get jobs}}post
const job=await jobsModel.create(req.body);
res.status(201).json({job});


export default getAllJobsController=async(req,res,next) =>{
    const jobs=await jobsModel.find();
    res.status(200).json({jobs}({
        totalJobs=jobs.length,
        jobs,
    })
}
