import express from "express";

//router object
const router = express.Router();

//routes
//GET USERS || GET
router.get("/", (req, res) => {
  res.send("GET USERS");
});

//updatde user ||put
router.put("/", (req, res) => {
  res.send("UPDATE USER");
});

export default router;
