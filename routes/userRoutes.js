import express from "express";

//router object
const router = express.Router();

//routes
//GET USERS || GET
router.get("/users", getUsersController);

//updatde user ||put
router.put("/update-user", userAuth, updateUserController);

export default router;
