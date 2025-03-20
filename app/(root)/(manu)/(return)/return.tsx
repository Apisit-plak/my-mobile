import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // ✅ ใช้ Axios แทน fetch()
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ReturnPage() {
  const router = useRouter();
  const [slots, setSlots] = useState([]); // ✅ รายการช่องฝากของ
  const [loading, setLoading] = useState(true); // ✅ โหลดข้อมูล
  const [error, setError] = useState(null); // ✅ ตรวจสอบ Error
  const API_URL = "http://172.20.10.2:8080/user-service/getUserLockerSlot"; // ✅ ใช้ IP จริงแทน localhost

  useEffect(() => {
    fetchUserSlots(); // ✅ โหลดข้อมูลตอนแรก
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("🔹 useFocusEffect: Fetching Locker Data...");
      fetchUserSlots();
    }, [])
  );

  const fetchUserSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      let token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "กรุณา Login ใหม่");
        return;
      }

      token = token.trim().replace(/^Bearer\s*/, ""); // ✅ ลบ "Bearer" ที่ซ้ำออกไป

      console.log("🔹 Fetching API:", API_URL);
      console.log("🔹 Sending Token:", `Bearer ${token}`);

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("🔹 API Response Status:", response.status);
      console.log("✅ API Response Data:", response.data);

      if (
        !response.data.lockerSlots ||
        response.data.lockerSlots.length === 0
      ) {
        setError("ไม่มีช่องฝากของที่ใช้งานอยู่");
        return;
      }

      // ✅ ตั้งค่าข้อมูลเพื่อแสดงใน FlatList
      setSlots(
        response.data.lockerSlots.map((slot) => ({
          id: slot.lockerSlotId.toString(),
          label: slot.slotNumber, // ✅ แสดงแค่ slotNumber
          available: slot.status === "ไม่ว่าง",
        }))
      );
    } catch (error) {
      console.error("❌ Error loading lockers:", error);
      setError("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  // ✅ เมื่อกดเลือกช่องคืนของ
  const handleSlotPress = (slotId) => {
    console.log("🔹 Returning Slot ID:", slotId);
    Alert.alert("คืนของ", `คุณต้องการคืนของจากช่อง ${slotId} หรือไม่?`, [
      { text: "ยกเลิก", style: "cancel" },
      { text: "ตกลง", onPress: () => console.log("📦 คืนของจากช่อง:", slotId) },
    ]);
  };

  // ✅ แสดงช่องเก็บของ
  const renderSlot = ({ item }) => (
    <TouchableOpacity
  style={[
    styles.slotContainer,
    { backgroundColor: "#E0FFFF"  },
  ]}
  onPress={() => handleSlotPress(item.id)}
  disabled={!item.available}
>
  {/* ✅ เพิ่มไอคอน */}
  <Ionicons
    name={ "lock-closed-outline"} // 🔒 หรือ 🔓
    size={80}
    color={"#999999"} // 🟢 ถ้าว่าง / ⚪️ ถ้าไม่ว่าง
    style={styles.icon}
  />

  <Text style={styles.slotLabel}>{item.label}</Text>
</TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#85CCCC" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={slots}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderSlot}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  slotContainer: {
    width: 170,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(133, 204, 204, 0.2)",
    margin: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#DCDCDC",
  },
  slotLabel: { 
    marginTop:20,
    fontSize: 16, fontWeight: "bold", color: "#999999" },
});
