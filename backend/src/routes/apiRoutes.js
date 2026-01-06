const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const checkAuth = require("../middleware/auth");

router.post("/gemini", checkAuth, apiController.proxyGemini);

module.exports = router;
