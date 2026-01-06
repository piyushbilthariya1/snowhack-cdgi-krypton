const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nanoKey: {
      type: String,
      unique: true,
      index: true,
    },
    walletBalance: {
      type: Number,
      default: 100.0,
      min: [0, "Insufficient balance"],
    },
    usageHistory: [
      {
        apiName: { type: String, required: true },
        cost: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Modern Async Hook (Fixes the "next is not a function" error)
userSchema.pre("save", async function () {
  if (!this.nanoKey) {
    this.nanoKey = `nk_${crypto.randomBytes(16).toString("hex")}`;
  }
  // Mongoose knows it's done when the function finishes because it's async
});

module.exports = mongoose.model("User", userSchema);
