import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.2:8080",
  // timeout: 15000, // Increase timeout to 15s
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch API (GET, POST, etc.)
export const fetchAPI = async (url: string, options?: any) => {
  try {
    console.log("🔄 [API Request]:", api.defaults.baseURL + url);
    const response = await api({
      url,
      ...options,
    });
    console.log("✅ [API Response]:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [API Error]:", error.message);
    throw new Error("Network Error: API is unreachable.");
  }
};
