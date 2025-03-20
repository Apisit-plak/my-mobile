import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function OTP() {
  const router = useRouter();
  const { returnType, email } = useLocalSearchParams(); // รับค่าจากหน้าที่แล้ว (ประเภทการรับคืน & อีเมล)
  const [otp, setOtp] = useState(["", "", "", ""]); // State สำหรับเก็บค่า OTP
  const inputs = useRef([]); // ใช้สำหรับจัดการ Focus

  // ✅ ฟังก์ชันส่ง OTP ไปยังอีเมลของผู้ใช้ (Mockup)
  const sendOTP = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert("OTP Sent", `รหัสถูกส่งไปที่อีเมล ${email}`);
      } else {
        Alert.alert("Error", "ไม่สามารถส่ง OTP ได้");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "เกิดข้อผิดพลาดในการส่ง OTP");
    }
  };

  // ✅ ฟังก์ชันยืนยัน OTP
  const onConfirmPress = async () => {
    const enteredOTP = otp.join(""); // รวมเป็นรหัสเดียว
    if (enteredOTP.length < 4) {
      Alert.alert("Error", "กรุณากรอกรหัส OTP ให้ครบ");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOTP }),
      });

      if (response.ok) {
        Alert.alert("Success", "OTP ถูกต้อง");
        router.push("/open"); // ✅ ไปหน้าเปิดตู้
      } else {
        Alert.alert("Error", "รหัส OTP ไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "เกิดข้อผิดพลาดในการตรวจสอบ OTP");
    }
  };

  // ✅ ฟังก์ชันเปลี่ยนค่า OTP และจัดการ Focus
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     
      {/* Title */}
      <View>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>We have sent the code to {email}</Text>
      </View>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputs.current[index] = ref)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && index > 0 && !value) {
                inputs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPress}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      {/* Resend OTP */}
      <TouchableOpacity onPress={sendOTP}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E0FFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#85CCCC",
    marginTop: 50,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#85CCCC",
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#85CCCC",
    textAlign: "center",
    fontSize: 20,
    color: "#85CCCC",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#85CCCC",
    paddingVertical: 10,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  confirmText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  resendText: {
    color: "#85CCCC",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    
  },
});
