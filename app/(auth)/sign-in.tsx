import React, { useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient"; // ✅ ใช้ Gradient Background

const API_BASE_URL = "http://172.20.10.2:8080"; // ✅ ใช้ IP Emulator

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState({ userName: "", passWord: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.userName || !form.passWord) {
      Alert.alert("❌ ล็อกอินไม่สำเร็จ", "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน", [{ text: "ตกลง" }]);
      return;
    }
  
    setLoading(true);
    try {
      console.log("🔄 [Login Request]:", form);
  
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: form.userName, passWord: form.passWord }),
      });
  
      const result = await response.json();
      console.log("✅ [Login Response]:", result);
  
      if (result?.tokens) {
        const tokens = `Bearer ${result.tokens}`;
        await AsyncStorage.setItem("token", tokens);
        console.log("✅ JWT Token Stored:", tokens);
        router.push("/(root)/(tabs)/home");
      } else {
        Alert.alert("❌ ล็อกอินล้มเหลว", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่", [{ text: "ตกลง" }]);
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      Alert.alert("⚠️ เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง", [{ text: "ตกลง" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#E8F5E9", "#FFFFFF"]} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Image style={styles.image} source={require("../../assets/images/safe.png")} />
            <Text style={styles.title}>เข้าสู่ระบบ</Text>
            {/* <Text style={styles.subtitle}>ยินดีต้อนรับกลับมา!</Text> */}
          </View>

          <View style={styles.form}>
  <InputField
    label="ชื่อผู้ใช้"
    placeholder="กรอกชื่อผู้ใช้"
    value={form.userName}
    onChangeText={(value) => setForm({ ...form, userName: value })}
  />
  <InputField
    label="รหัสผ่าน"
    placeholder="กรอกรหัสผ่าน"
    secureTextEntry={true}
    value={form.passWord}
    onChangeText={(value) => setForm({ ...form, passWord: value })}
  />
</View>


          {/* <View style={styles.rowTextForgetPassword}>
            <Link href="/forgot-password" style={styles.forgotPassword}>
              ลืมรหัสผ่าน?
            </Link>
          </View> */}

          <CustomButton
            title={loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            onPress={handleLogin}
            style={[styles.button, loading && styles.buttonDisabled]} // ✅ เพิ่มเอฟเฟกต์เมื่อกำลังโหลด
            disabled={loading}
          />

          {/* <View style={styles.row}>
            <Text style={styles.loginText}>ยังไม่มีบัญชี? </Text>
            <Link href="/sign-up" style={styles.loginLink}>
              ลงทะเบียน
            </Link>
          </View> */}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  
  safeArea: { width: "100%", alignItems: "center" },
  header: { marginTop: 20, alignItems: "center", justifyContent: "center" },
  image: { height: 100, width: 100, marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "bold", color: "#388E3C" },
  subtitle: { fontSize: 16, color: "#4CAF50", textAlign: "center", marginTop: 5 },
  form: { width: "100%", marginTop: 20 },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
    elevation: 3, // ✅ เพิ่มเงาให้ปุ่ม
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  loginText: { fontSize: 14, color: "#A8A8A8" },
  loginLink: { fontSize: 14, fontWeight: "bold", color: "#2E7D32" },
  row: { marginTop: 20, flexDirection: "row", justifyContent: "center" },
  rowTextForgetPassword: { marginTop: 5, width: "100%", flexDirection: "row", justifyContent: "flex-end" },
  forgotPassword: { fontSize: 14, color: "#2E7D32", fontWeight: "bold" },
});
