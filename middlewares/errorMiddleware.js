const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const defaultErrors = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  // Handle validation error
  if (error.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }

  // Handle duplicate error
  if (error.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = "Duplicate field value entered";
  }

  // Handle ObjectId casting errors
  if (error.message.includes("Cast to ObjectId failed")) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = "Invalid job ID format";
  }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;
