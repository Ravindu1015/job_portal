import express from "express";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
// create job||post
router.post("/create-job", userAuth);

export default router;
