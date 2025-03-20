import React, { useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";

const Newpassword = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const onSubmitPress = () => {
    if (!form.password || !form.confirmPassword) {
      alert("รหัสผ่านไม่ครบครบถ้วน : กรุณากรอกรหัสผ่านให้ครบถ้วน");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน: กรุณากรอกใหม่อีกรอบ");
      return;
    }
    alert("เปลี่ยนรหัสสำเร็จ");
    router.push("/"); // เปลี่ยนเส้นทางกลับไปหน้าหลัก
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../assets/images/access.png")}
          />
          <Text style={styles.title}>New Password</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Password"
            labelStyle={styles.textfrom}
            placeholder="Password"
            placeholderTextColor="#DCDCDC"
            value={form.password}
            onChangeText={(value) =>
              setForm({
                ...form,
                password: value,
              })
            }
          />

          <InputField
            label="Confirm Password"
            labelStyle={styles.textfrom}
            placeholder="Confirm Password"
            placeholderTextColor="#DCDCDC"
            value={form.confirmPassword}
            onChangeText={(value) =>
              setForm({
                ...form,
                confirmPassword: value,
              })
            }
          />
        </View>

        <View style={styles.rowForgetpassword}>
          <Link href="/(auth)/forgot-password" style={styles.buttonContainer}>
            <View style={styles.buttonForgetLelf}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </Link>

          <TouchableOpacity onPress={onSubmitPress} style={styles.buttonContainer}>
            <View style={styles.buttonForgetRight}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Newpassword;

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
  form: {
    width: "100%",
    marginTop: 20,
  },
  textfrom: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#85CCCC",
    marginBottom: 8,
  },
  rowForgetpassword: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonForgetLelf: {
    backgroundColor: "rgba(133, 204, 204, 0.5)",
    paddingVertical: 10,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  buttonForgetRight: {
    backgroundColor: "#85CCCC",
    paddingVertical: 10,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
