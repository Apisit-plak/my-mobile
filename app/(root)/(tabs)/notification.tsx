import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import axios from "axios";

const NotificationScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]); // ✅ กำหนดค่าเริ่มต้นเป็น array

  useEffect(() => {
    fetchMessages();
    fetchTreeData();
  }, []);

  // 📌 โหลดข้อมูลแจ้งเตือน
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8080/api/fetch");
      const sortedMessages = response.data
        .map((item) => ({
          ...item,
          boardId: Math.floor(item.value / 100), // คำนวณ Board ID
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 โหลดข้อมูลต้นไม้จาก listtree
  const fetchTreeData = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8080/Tree888");
      console.log("🌳 Tree Data Loaded:", response.data); // ✅ Debug ตรวจสอบ API
      if (response.data && Array.isArray(response.data)) {
        setTreeData(response.data); // ✅ เก็บข้อมูลต้นไม้ทั้งหมด
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setTreeData(response.data.data); // ✅ กรณี API มีโครงสร้าง `{ data: [...] }`
      } else {
        console.error("❌ API Data Format Incorrect:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tree data:", error);
    }
  };

  // 📌 หาพิกัดจาก listtree ที่ตรงกับ Board ID
  const findTreeLocation = (boardId) => {
    if (!Array.isArray(treeData)) {
      console.error("❌ treeData is not an array:", treeData);
      return null;
    }
    return treeData.find((tree) => tree.id === boardId) || null;
  };

  const handlePress = (item) => {
    const treeLocation = findTreeLocation(item.boardId); // ✅ หา ID ที่ตรงกัน
    if (treeLocation) {
      console.log("📍 กำลังไปยังตำแหน่ง:", treeLocation);
      router.push({
        pathname: "/location-tree",
        params: {
          lat: treeLocation.latitude,
          lon: treeLocation.longitude,
        },
      });
    } else {
      alert("⚠️ ไม่มีพิกัดที่ตรงกับแจ้งเตือนนี้");
    }
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageContainer}
      onPress={() => handlePress(item)}
    >
      <Ionicons name="notifications-outline" size={24} color="#4CAF50" style={styles.icon} />
      <View>
        <Text style={styles.messageTitle}>บอร์ด ID: {item.boardId}</Text>
        <Text style={styles.messageText}>สถานะ: {item.status}</Text>
        <Text style={styles.messageText}>ค่า Value: {item.value}</Text>
        <Text style={styles.messageTime}>เวลาแจ้งเตือน: {item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          ListEmptyComponent={<Text style={styles.emptyText}>ไม่มีข้อความ</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 15,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8E6C9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  messageText: {
    fontSize: 14,
    color: "#2E7D32",
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});
