import api from "../../services/api";

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  // Save the key automatically on signup for the demo
  if (response.data.data.nanoKey) {
    localStorage.setItem("nano_key", response.data.data.nanoKey);
  }
  return response.data;
};

export const topUpWallet = async (amount) => {
  const response = await api.post("/users/topup", { amount });
  return response.data;
};
