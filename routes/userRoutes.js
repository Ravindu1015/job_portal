import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  updateUserController,
  getUsersController,
} from "../controllers/userController.js";

//router object
const router = express.Router();

//routes
//GET USERS || GET
router.get("/users", getUsersController);

//update user ||put
router.put("/update-user", userAuth, updateUserController);

export default router;
