const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nanoKey: { type: String, unique: true },
    walletBalance: { type: Number, default: 100.0 }, // Initial credits
    usageHistory: [
      {
        apiName: String,
        cost: Number,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Production Hack: Generate unique nk_ key before saving
userSchema.pre("save", function (next) {
  if (!this.nanoKey) {
    this.nanoKey = `nk_${crypto.randomBytes(16).toString("hex")}`;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
