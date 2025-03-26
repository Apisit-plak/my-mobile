import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const NotificationScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(""); // กำหนดค่าเริ่มต้นเป็น ""
  const [boardList, setBoardList] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("ย้อนหลังทั้งหมด"); // ตั้งค่าดีฟอลต์เป็น "ย้อนหลังทั้งหมด"

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8080/api/fetch");
      const sortedMessages = response.data
        .map((item) => ({
          ...item,
          boardId: Math.floor(item.value / 100),
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(sortedMessages);

      // ดึงค่า unique board ID แล้วทำการ sort จากน้อยไปหามาก
      const uniqueBoards = [...new Set(sortedMessages.map((msg) => msg.boardId))]
        .sort((a, b) => a - b); // เรียงลำดับจากน้อยไปหามาก
      setBoardList(uniqueBoards);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = (messages, days) => {
    const now = new Date();
    return messages.filter((msg) => {
      const messageDate = new Date(msg.timestamp);
      const differenceInDays = (now - messageDate) / (1000 * 3600 * 24);
      return differenceInDays <= days;
    });
  };

  // กรองข้อความตามช่วงเวลาและบอร์ดที่เลือก
  const filteredMessages = selectedTimeRange === "ย้อนหลังทั้งหมด"
    ? messages.filter((msg) =>
        selectedBoard ? msg.boardId.toString() === selectedBoard : true
      )
    : filterByDate(messages, parseInt(selectedTimeRange)).filter((msg) =>
        selectedBoard ? msg.boardId.toString() === selectedBoard : true
      );

  const renderMessage = ({ item }) => (
    <TouchableOpacity style={styles.messageContainer}>
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
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>เลือกบอร์ดที่ต้องการแสดง</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.button, selectedBoard === "" && styles.selectedButton]} 
            onPress={() => setSelectedBoard("")}
          >
            <Text style={styles.buttonText}>ทั้งหมด</Text>
          </TouchableOpacity>
          {boardList.map((board) => (
            <TouchableOpacity 
              key={board} 
              style={[styles.button, selectedBoard === board.toString() && styles.selectedButton]} 
              onPress={() => setSelectedBoard(board.toString())}
            >
              <Text style={styles.buttonText}>บอร์ด ID: {board}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>เลือกช่วงเวลา</Text>
        <View style={styles.buttonGroup}>
          {["ย้อนหลังทั้งหมด", "1", "7", "30"].map((time) => (
            <TouchableOpacity 
              key={time} 
              style={[styles.button, selectedTimeRange === time && styles.selectedButton]} 
              onPress={() => setSelectedTimeRange(time)}
            >
              <Text style={styles.buttonText}>
                {time === "ย้อนหลังทั้งหมด" ? "ย้อนหลังทั้งหมด" : `ย้อนหลัง ${time} วัน`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList data={filteredMessages} renderItem={renderMessage} ListEmptyComponent={<Text style={styles.emptyText}>ไม่มีข้อความ</Text>} />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9", padding: 15 },
  buttonContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", color: "#2E7D32", marginBottom: 5 },
  buttonGroup: { flexDirection: "row", flexWrap: "wrap" },
  button: { 
    backgroundColor: "#C8E6C9", 
    padding: 10, 
    margin: 5, 
    borderRadius: 5, 
    width: "45%", 
    alignItems: "center"
  },
  selectedButton: {
    backgroundColor: "#4CAF50", 
  },
  buttonText: { 
    color: "#1B5E20", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  messageContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#C8E6C9", 
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 10 
  },
  icon: { 
    marginRight: 10 
  },
  messageTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#1B5E20" 
  },
  messageText: { 
    fontSize: 14, 
    color: "#2E7D32" 
  },
  messageTime: { 
    fontSize: 12, 
    color: "#666" 
  },
  emptyText: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "#999", 
    marginTop: 50 
  },
});
