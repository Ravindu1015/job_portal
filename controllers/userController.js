import userModels from "../models/userModels.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastname, location } = req.body;
  if (!name || !email || !lastname || !location) {
    return next("Please provide all the fields");
  }
  const user = await userModels.findById(req.user.userId);
  user.name = name;
  user.email = email;
  user.lastname = lastname;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({ user, token });
};
