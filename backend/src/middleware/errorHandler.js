/**
 * Centralized Error Handler Middleware
 * Catches all errors thrown via asyncHandler or manually
 */
const errorHandler = (err, req, res, next) => {
  // 1. Determine the status code
  // If the error has a status code (like 400 or 401), use it.
  // Otherwise, default to 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // 2. Log the error for the developer (server-side only)
  console.error(`🔴 Error: ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  // 3. Send the JSON response to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected server error occurred.",
    // Only send the stack trace in development mode for security
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// CRITICAL: Export the function so server.js can use it
module.exports = errorHandler;
