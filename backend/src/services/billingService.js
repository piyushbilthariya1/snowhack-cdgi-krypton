exports.calculateCharge = (apiName) => {
  const rates = {
    "Gemini-Flash": 0.1, // Cost in your local currency units
    "OpenAI-GPT4": 0.5,
  };
  return rates[apiName] || 0.05;
};

exports.deductBalance = async (user, amount, apiName) => {
  user.walletBalance -= amount;
  user.usageHistory.unshift({ apiName, cost: amount });
  return await user.save();
};
