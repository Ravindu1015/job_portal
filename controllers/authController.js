export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      return res.status(400).send({
        message: "Name is required",
        success: false,
      });
    }
    if (!email) {
      return res.status(400).send({
        message: "Email is required",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).send({
        message: "Password is required",
        success: false,
      });
    }
    //check if user exists
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      message: "User registered successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in registerController",
      success: false,
      error,
    });
  }
};
