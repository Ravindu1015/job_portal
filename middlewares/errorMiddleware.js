const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const defaultErrors = {
    statusCode,
    message: error?.message || "Internal Server Error", // Safe fallback for error.message
  };

  // Handle Mongoose Validation Errors
  if (error.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(error.errors || {})
      .map((item) => item.message || "Validation error")
      .join(", ");
  }

  // Handle Duplicate Key Errors
  if (error.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = "Duplicate field value entered";
  }

  // Handle Invalid ObjectId Errors
  if (error.name === "CastError" && error.kind === "ObjectId") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `Invalid ${error.path || "field"}: ${
      error.value || "unknown value"
    }`;
  }

  // Send Error Response
  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;
