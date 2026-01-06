const axios = require("axios");

class NanoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://localhost:5000/api/v1/proxy";
  }

  async generate(prompt) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/gemini`,
        { prompt },
        {
          headers: { "x-nano-key": this.apiKey },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "SDK Error:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  }
}

module.exports = NanoAPI;
