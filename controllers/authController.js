import userModel from "../models/userModels.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name) {
    return res.status(400).json({
      message: "Name is required",
      success: false,
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
      success: false,
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password is required",
      success: false,
    });
  }

  // Check if the user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
      success: false,
    });
  }

  // Create a new user
  const user = await userModel.create({
    name,
    email,
    password,
  });

  //token
  const token = user.createJWT();

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    message: "user created succesfully",
    user: {
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
