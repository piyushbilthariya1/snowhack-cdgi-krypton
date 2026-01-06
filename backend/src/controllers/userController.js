const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Register a new user & Generate NanoKey
// @route   POST /api/v1/users/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // 1. Validation check
  if (!name || !email) {
    res.status(400);
    throw new Error("Please provide both name and email.");
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email.");
  }

  // 3. Create user
  // The pre-save hook in your Model handles the nk_ key generation
  const user = await User.create({ name, email });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        nanoKey: user.nanoKey,
        balance: user.walletBalance,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data received.");
  }
});

// @desc    Get User Profile & Balance
// @route   GET /api/v1/users/profile
// @access  Private (Requires x-nano-key)
exports.getProfile = asyncHandler(async (req, res) => {
  // OPTIMIZATION:
  // Since your checkAuth middleware already did: req.user = user;
  // You don't need to query the database again. Just return req.user.

  if (!req.user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json({
    success: true,
    data: req.user,
  });
});
