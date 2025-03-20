// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_BASE_URL = "http://172.20.10.2:8080/user-service"; // ✅ ใช้ `10.0.2.2` แทน `localhost` ใน Emulator

// export const fetchAPI = async (url: string, options = {}) => {
//     try {
//         const token = await AsyncStorage.getItem("token");
//         console.log("📢 Token ที่ส่งไป:", token); // 🛠 ตรวจสอบ Token ที่ถูกส่งไป

//         const headers = {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: token } : {}), // ✅ ถ้ามี Token ให้ใส่ไปใน Header
//         };

//         console.log("📤 API Request:", API_BASE_URL + url, options.method, headers, options.body);

//         const response = await axios({
//             url: `${API_BASE_URL}${url}`,
//             method: options.method || "POST",
//             headers,
//             data: options.body || null,
//         });

//         console.log("✅ API Response:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("❌ API Error:", error?.response?.data || error.message);
//         throw new Error(error?.response?.data?.message || "API Error");
//     }
// };
