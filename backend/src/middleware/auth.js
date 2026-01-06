const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const checkAuth = asyncHandler(async (req, res, next) => {
  const nanoKey = req.headers["x-nano-key"];

  if (!nanoKey) {
    res.status(401);
    throw new Error("No API Key provided. Access Denied.");
  }

  // Find user by their unique nanoKey
  const user = await User.findOne({ nanoKey });

  if (!user) {
    res.status(401);
    throw new Error("Invalid API Key.");
  }

  // Attach user to the request object for use in controllers
  req.user = user;
  next();
});

module.exports = checkAuth;
