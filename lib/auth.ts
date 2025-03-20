import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { fetchAPI } from "@/lib/fetch";

// จัดการ token
export const tokenCache = {
  async getToken(key: string) {
    try {
      const token = await SecureStore.getItemAsync(key);
      if (!token) console.log("No token stored under key: " + key);
      return token;
    } catch (error) {
      console.error("SecureStore error:", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },
};

// ฟังก์ชันเชื่อม OAuth
export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home"),
    });

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });

      // บันทึก User ID
      if (signUp.createdUserId) {
        await fetchAPI("/user-service/api/create/users", {
          method: "POST",
          data: {
            firstName: signUp.firstName,
            lastName: signUp.lastName,
            email: signUp.email,
            phone:signUp.phone,
            password:signUp.password,
          },
        });
      }
      return { success: true, message: "Google login successful!" };
    }

    return { success: false, message: "Google login failed." };
  } catch (error: any) {
    console.error("Google OAuth error:", error);
    return { success: false, message: error.message };
  }
};
