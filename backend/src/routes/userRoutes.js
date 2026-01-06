const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Simple registration for Hackathon demo
router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json(user);
});

module.exports = router;
