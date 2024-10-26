//error middleware || next function
const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.DEV_MODE === "true" ? "stack" : null,
  });
};

export default errorMiddleware;
