import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface TreeDetail {
  id: number;
  latitude: number;
  longitude: number;
  createDate: string | null;
}

export default function TreeInfoScreen() {
  const router = useRouter();
  const { boardId } = useLocalSearchParams<{ boardId?: string }>(); 

  console.log("📌 Received boardId:", boardId); // ✅ Debugging ID

  if (!boardId) {
    console.error("❌ Error: boardId is missing from params!");
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>⚠️ Error: Missing boardId</Text>
      </View>
    );
  }

  const [tree, setTree] = useState<TreeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = `http://172.20.10.2:8080/firebase/${boardId}`;

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        console.log("📡 Fetching Data from API:", API_URL);
        const response = await fetch(API_URL);
        const responseText = await response.text();
        console.log("📊 API Raw Response:", responseText);

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }

        const result = JSON.parse(responseText);
        console.log("📊 API Parsed JSON:", result);

        setTree(result);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [boardId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>❌ เกิดข้อผิดพลาด: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Header Section */}
    

      {/* 🌲 Tree Information Card */}
      {tree && (
        <View style={styles.card}>
          <Image source={require("../../../../assets/images/tree.png")} style={styles.treeImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.detailText}>🌳 ID: {tree.id}</Text>
            <Text style={styles.detailText}>📍 Latitude: {tree.latitude.toFixed(5)}</Text>
            <Text style={styles.detailText}>📍 Longitude: {tree.longitude.toFixed(5)}</Text>
            <Text style={styles.detailText}>
              🕒 สร้างเมื่อ: {tree.createDate ? new Date(tree.createDate).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }) : "N/A"}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#A5D6A7",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  treeImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 15,
  },
  infoContainer: {
    alignItems: "center",
  },
  detailText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginVertical: 5,
  },
});

