import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";


const ForgotPassword = () => {
  const router = useRouter(); // เรียกใช้งาน router

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../assets/images/access.png")}
          />
          <Text style={styles.title}>Forget your Password?</Text>
          <Text style={styles.subtitle}>
            Enter the email for your account so we can send you a link to reset
            your password
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email"
            labelStyle={styles.textfrom}
            placeholder="@gmail.com"
            placeholderTextColor="#DCDCDC"
            value={form.email}
            onChangeText={(value) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />
        </View>

        <View style={styles.rowForgetpassword}>
          <Link href="/sign-in" style={styles.buttonContainer}>
            <View style={styles.buttonForgetLelf}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </Link>

          <Link href="/newpassword" style={styles.buttonContainer}>
            <View style={styles.buttonForgetRight}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </Link>
        </View>

        {/* OAuth */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFF",
  },
  safeArea: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 90,
    width: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    color: "#85CCCC",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#85CCCC",
    textAlign: "center",
    marginTop: 5,
  },
  textfrom: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#85CCCC",
    marginBottom: 8,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#85CCCC",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#A8A8A8",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#85CCCC",
  },
  rowTextForgetPassword: {
    marginTop: 2,
    justifyContent: "space-between",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#85CCCC",
    fontWeight: "500",
  },
  rowForgetpassword: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end", // แบ่งระยะห่างให้สมดุล
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
    width: "100%", // กำหนดขนาดของแถวโดยรวม
  },
  buttonContainer: {
    flex: 1, // ให้ปุ่มขยายพื้นที่ได้เท่ากัน
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวนอน
  },
  buttonForgetLelf: {
    backgroundColor: "rgba(133, 204, 204, 0.5)",
    paddingVertical: 10, // เพิ่มความสูงแนวตั้ง
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: "90%", // ลดขนาดปุ่มในแต่ละ container
  },
  buttonForgetRight: {
    backgroundColor: "#85CCCC",
    paddingVertical: 10,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: "90%", // ลดขนาดปุ่มในแต่ละ container
  },
});
