import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.splite(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (error) {
    next("Auth Failed");
  }
};
