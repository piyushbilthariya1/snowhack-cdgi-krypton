const axios = require("axios");
const billing = require("../services/billingService");

exports.proxyGemini = async (req, res) => {
  const { prompt } = req.body;
  const user = req.user;

  try {
    // 1. Proxy the request to Google
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_MASTER_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    // 2. Billing Process
    const cost = billing.calculateCharge("Gemini-Flash");
    await billing.deductBalance(user, cost, "Gemini-Flash");

    res.json({
      success: true,
      data: response.data.candidates[0].content.parts[0].text,
      balance: user.walletBalance.toFixed(2),
    });
  } catch (error) {
    res.status(502).json({ error: "Upstream Provider Error" });
  }
};
