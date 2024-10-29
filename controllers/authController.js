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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
      success: false,
    });
  }

  //find user by mail
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  //compare passworrd
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  //token
  const token = user.createJWT();
  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
