const User = require("../models/User");

// Create a new user (Signup)
exports.registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create user (The pre-save hook in User.js will generate the nanoKey)
    user = await User.create({ name, email });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email,
        nanoKey: user.nanoKey,
        balance: user.walletBalance,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get User Profile & Balance
exports.getProfile = async (req, res) => {
  try {
    // We get the user from the auth middleware (we'll build this next)
    const user = await User.findById(req.user.id).select("-__v");
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
