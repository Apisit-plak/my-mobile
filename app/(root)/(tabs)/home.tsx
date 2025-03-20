import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    
    // ✅ ฟอร์แมตวันที่เป็นภาษาไทย
    const formattedDate = new Intl.DateTimeFormat("th-TH", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(now);

    // ✅ ฟอร์แมตเวลาเป็น AM/PM
    const formattedTime = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>แจ้งเตือนตัดไม้</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Ionicons name="" size={5} color="#4CAF50" />
      </View>

      {/* Location Card */}
      <TouchableOpacity style={styles.locationCard} onPress={() => router.push("/location-tree")}>
        <View style={styles.headerContainer}>
          <Text style={styles.locationText}>📍 ตำแหน่งต้นไม้</Text>
          <Ionicons name="location-outline" size={60} color="#FFFFFF" style={styles.iconStyle} />
        </View>
        <Text style={styles.dateText}> {currentDate}</Text>
        <Text style={styles.timeText}> {currentTime}</Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/listtree")}>
          <Ionicons name="folder-open-outline" size={24} color="#2E7D32" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>ต้นไม้ทั้งหมด</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/historyNotification")}>
          <Ionicons name="cube-outline" size={24} color="#2E7D32" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>ประวัติการแจ้งเตือน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8E6C9",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    color: "#2E7D32",
    fontSize: 16,
    marginLeft: 10,
  },
  locationCard: {
    height: 140,
    backgroundColor: "#4CAF50",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A8E6CF",
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: "auto",
  },
});
