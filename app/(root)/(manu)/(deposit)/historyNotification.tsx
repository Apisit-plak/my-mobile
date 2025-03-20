import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // ✅ ใช้ Picker ที่ถูกต้อง
import axios from "axios";

const NotificationScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(""); // ✅ ใช้ "" แทน null
  const [boardList, setBoardList] = useState([]); // ✅ เก็บรายการบอร์ดทั้งหมด

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8080/api/fetch");
      const sortedMessages = response.data
        .map((item) => ({
          ...item,
          boardId: Math.floor(item.value / 100), // ✅ ดึง Board ID จาก Value
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(sortedMessages);

      // ✅ ดึงรายการบอร์ดที่มีอยู่
      const uniqueBoards = [...new Set(sortedMessages.map((msg) => msg.boardId))];
      setBoardList(uniqueBoards);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชันกรองข้อมูลตามบอร์ดที่เลือก
  const filteredMessages = selectedBoard
  ? messages.filter((msg) => msg.boardId.toString() === selectedBoard) // ✅ ใช้ string เปรียบเทียบ
  : messages;

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
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
      {/* ✅ Dropdown Picker สำหรับเลือกบอร์ด */}
      <View style={styles.pickerContainer}>
    <Text style={styles.label}>เลือกบอร์ดที่ต้องการแสดง</Text>
    <Picker
  selectedValue={selectedBoard || ""}
  onValueChange={(itemValue) => setSelectedBoard(itemValue || "")}
  style={{ color: "#2E7D32" }} // ✅ สีของข้อความที่ถูกเลือก
>
  <Picker.Item label="ทั้งหมด" value="" style={{ color: "#1B5E20", fontWeight: "bold" }} />
  
  {/* ✅ ตรวจสอบก่อน map ว่า boardList มีข้อมูล */}
  {boardList && boardList.length > 0 ? (
    boardList.map((board) => (
      <Picker.Item
        key={board}
        label={`บอร์ด ID: ${board}`}
        value={board.toString()}
        style={{ color: "#388E3C" }}
      />
    ))
  ) : (
    <Picker.Item label="ไม่มีบอร์ดที่ใช้ได้" value="" style={{ color: "gray" }} />
  )}
</Picker>

  </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={filteredMessages}
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
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: "#C8E6C9",
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
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
