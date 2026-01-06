const User = require("../models/User");

/**
 * Calculates the cost based on the model used.
 * Production Tip: In a real SaaS, these rates would be in a DB or Config file.
 */
exports.calculateCharge = (modelName) => {
  const rates = {
    "Gemini-Flash": 0.1, // ₹0.10 per request
    "Gemini-Pro": 0.5, // ₹0.50 per request
  };
  return rates[modelName] || 0.1;
};

/**
 * Atomic balance deduction and history logging
 */
exports.deductBalance = async (user, cost, apiName) => {
  // We use findOneAndUpdate to ensure the operation is atomic
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id, walletBalance: { $gte: cost } }, // Only deduct if they have enough money
    {
      $inc: { walletBalance: -cost },
      $push: {
        usageHistory: {
          $each: [{ apiName, cost, timestamp: new Date() }],
          $position: 0, // Keep latest transactions at the top
        },
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("Insufficient balance or user not found.");
  }

  return updatedUser;
};
