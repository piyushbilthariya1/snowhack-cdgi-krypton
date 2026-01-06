const axios = require("axios");
const billing = require("../services/billingService");
const asyncHandler = require("express-async-handler");

exports.proxyGemini = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const user = req.user;

  // 1. PRE-CHECK: Don't call Google if the user can't afford it
  const cost = billing.calculateCharge("Gemini-Flash");
  if (user.walletBalance < cost) {
    res.status(402); // Payment Required
    throw new Error("Insufficient balance. Please top up your credits.");
  }

  try {
    // 2. Proxy the request to Google
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_MASTER_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    // 3. Billing Process (Atomic Update)
    await billing.deductBalance(user, cost, "Gemini-Flash");

    res.json({
      success: true,
      data: response.data.candidates[0].content.parts[0].text,
      balance: user.walletBalance.toFixed(2),
    });
  } catch (error) {
    // Log the specific error for debugging
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(502);
    throw new Error(
      "AI Provider is currently unreachable. No credits were deducted."
    );
  }
});
