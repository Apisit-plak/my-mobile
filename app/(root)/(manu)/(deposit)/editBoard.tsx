import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const API_EDIT_URL = "http://172.20.10.2:8080/editIoTData"; // ✅ API แก้ไข IoT Data

export default function EditBoard() {
  const router = useRouter();
  const { boardId, latitude, longitude } = useLocalSearchParams();

  const [lat, setLat] = useState(latitude || "");
  const [lon, setLon] = useState(longitude || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!lat || !lon) {
      Alert.alert("⚠️ ค่าพิกัดต้องไม่เป็นค่าว่าง");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_EDIT_URL}/${boardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: parseFloat(lat).toFixed(5), // ✅ ตัดทศนิยมให้เหลือ 5 ตำแหน่ง
          longitude: parseFloat(lon).toFixed(5),
        }),
      });

      if (!response.ok) throw new Error("Failed to update board");

      Alert.alert("✅ สำเร็จ", "อัปเดตข้อมูลเรียบร้อยแล้ว!");
      router.replace("/(root)/(manu)/(deposit)/listtree"); // ✅ กลับไปหน้า ListTree
    } catch (error) {
      Alert.alert("❌ ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>แก้ไขตำแหน่ง Board ID: {boardId}</Text>
      <TextInput
        style={styles.input}
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric"
        placeholder="กรอก Latitude"
      />
      <TextInput
        style={styles.input}
        value={lon}
        onChangeText={setLon}
        keyboardType="numeric"
        placeholder="กรอก Longitude"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "กำลังบันทึก..." : "บันทึก"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E3F2FD", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { width: "90%", padding: 10, marginVertical: 10, borderWidth: 1, borderRadius: 8, backgroundColor: "#FFF" },
  saveButton: { backgroundColor: "#FFA000", padding: 10, borderRadius: 8, alignItems: "center", width: "90%" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
