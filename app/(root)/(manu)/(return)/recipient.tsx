import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Recipient() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("self");
  const [email, setEmail] = useState(""); // เก็บค่าอีเมลที่กรอก

  const handleSubmitPress = () => {
    if (selectedOption === "self" || selectedOption === "proxy") {
      // ✅ ไปที่หน้ากรอก OTP โดยส่ง returnType ไปด้วย
      router.push({
        pathname: "/otp",
        params: { returnType: selectedOption, email: "" },
      });
    } else if (selectedOption === "email" && email) {
      // ✅ ไปที่หน้ากรอก OTP พร้อมส่งอีเมลไป
      router.push({
        pathname: "/otp",
        params: { returnType: "email", email },
      });
    } else {
      // ✅ แจ้งเตือนถ้ายังไม่กรอกอีเมล
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมลให้ครบถ้วน");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/images/lock.png")}
          style={styles.image}
        />
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "self" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedOption("self")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "self" ? styles.activeText : styles.inactiveText,
            ]}
          >
            รับคืนหรือยกเลิกด้วยตนเอง
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "proxy" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedOption("proxy")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "proxy" ? styles.activeText : styles.inactiveText,
            ]}
          >
            รับแทน
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "email" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedOption("email")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "email" ? styles.activeText : styles.inactiveText,
            ]}
          >
            สำหรับผู้รับแทน
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      {selectedOption === "email" && (
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="กรอกอีเมล"
            placeholderTextColor="#85CCCC"
            value={email}
            onChangeText={setEmail}
          />
          <Ionicons name="mail-outline" size={20} color="#85CCCC" />
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  optionsContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  optionButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
  },
  activeButton: {
    backgroundColor: "#85CCCC",
    borderColor: "#85CCCC",
    borderWidth: 1,
  },
  inactiveButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#BEBEBE",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeText: {
    color: "#FFFFFF",
  },
  inactiveText: {
    color: "#BEBEBE",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#85CCCC",
    marginVertical: 2,
    width: "80%",
    alignSelf: "center",
  },
  emailInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: "#85CCCC",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#85CCCC",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
