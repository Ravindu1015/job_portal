import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and valid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT token
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the user details to the request object
    req.user = { userId: payload.userId };

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ message: "Invalid token or authorization failed" });
  }
};

export default userAuth;
