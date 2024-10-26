//error middleware || next function
const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const defaultErrors = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  res.json({
    message: error.message,
    stack: process.env.DEV_MODE === "true" ? "stack" : null,
  });
  //missing field error
  if (error.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }

  //duplicate error
  if (error.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = "Duplicate field value entered";
  }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;
