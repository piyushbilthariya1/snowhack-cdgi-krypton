const User = require("../models/User");

module.exports = async (req, res, next) => {
  const nanoKey = req.headers["x-nano-key"];
  if (!nanoKey) return res.status(401).json({ error: "Missing API Key" });

  try {
    const user = await User.findOne({ nanoKey });
    if (!user) return res.status(401).json({ error: "Invalid API Key" });
    if (user.walletBalance < 0.1)
      return res.status(402).json({ error: "Insufficient Balance" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Auth Server Error" });
  }
};
