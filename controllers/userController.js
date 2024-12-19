import userModels from "../models/userModels.js";

// Controller to update user information
export const updateUserController = async (req, res, next) => {
  const { name, email, lastname, location } = req.body;

  // Validation
  if (!name || !email || !lastname || !location) {
    return next("Please provide all the fields");
  }

  // Find user by ID
  const user = await userModels.findById(req.user.userId);

  if (!user) {
    return next("User not found");
  }

  // Update user details
  user.name = name;
  user.email = email;
  user.lastname = lastname;
  user.location = location;

  // Save updated user and generate a new JWT token
  await user.save();
  const token = user.createJWT();
  res.status(200).json({ user, token });
};

// Controller to get users
export const getUsersController = async (req, res, next) => {
  const users = await userModels.find();
  res.status(200).json({ users });
};
