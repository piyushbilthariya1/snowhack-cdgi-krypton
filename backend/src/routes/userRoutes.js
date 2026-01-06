const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/auth"); // Ensure this is created

// Public Route
router.post("/register", userController.registerUser);

// Protected Route (Requires x-nano-key header)
router.get("/profile", checkAuth, userController.getProfile);

module.exports = router;
