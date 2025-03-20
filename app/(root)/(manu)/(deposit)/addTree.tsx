import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const API_SAVE_URL = "http://172.20.10.2:8080/save"; // ✅ เปลี่ยนเป็น API ของคุณ

export default function AddTree() {
  const router = useRouter();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSave = async () => {
    if (!latitude || !longitude) {
      Alert.alert("⚠️ กรุณากรอกค่า Latitude และ Longitude");
      return;
    }

    try {
      const response = await fetch(API_SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });

      if (!response.ok) throw new Error("Failed to save tree");

      Alert.alert("✅ สำเร็จ", "บันทึกต้นไม้สำเร็จ!");
      router.push("/(root)/(manu)/(deposit)/listtree"); // ✅ กลับไปยังหน้ารายการต้นไม้
    } catch (error) {
      console.error("❌ Error saving tree:", error);
      Alert.alert("❌ เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่มต้นไม้ใหม่</Text>
      <TextInput
  style={styles.input}
  placeholder="Latitude"
  placeholderTextColor="#808080"
  value={latitude}
  onChangeText={setLatitude}
/>
<TextInput
  style={styles.input}
  placeholder="Longitude"
  placeholderTextColor="#808080"
  value={longitude}
  onChangeText={setLongitude}
/>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#85CCCC",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
