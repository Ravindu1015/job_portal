const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const defaultErrors = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  if (error.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  } else if (error.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = "Duplicate field value entered";
  } else if (error.message) {
    defaultErrors.message = error.message;
  }

  res.json({
    message: defaultErrors.message,
    stack: process.env.DEV_MODE === "true" ? error.stack : null,
  });
};

export default errorMiddleware;
