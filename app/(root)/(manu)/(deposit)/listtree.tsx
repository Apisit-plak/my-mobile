import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

// ประกาศชนิดของข้อมูลสำหรับ item
interface Board {
  id: number;
  latitude: number;
  longitude: number;
}

export default function Disposit() {
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://172.20.10.2:8080/Tree888";
  const API_EDIT_URL = "http://172.20.10.2:8080/editBoard"; // API สำหรับแก้ไขบอร์ด

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.status) {
          // เรียงข้อมูลตาม id จากน้อยไปมาก
          const sortedData = result.data.sort((a: Board, b: Board) => a.id - b.id);
          setBoards(sortedData);
        } else {
          throw new Error(result.message || "Error fetching data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        Alert.alert("Error", err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBoards();
  }, []);
  

  const handleBoardPress = (boardId: number) => {
    console.log("🔍 Navigating to infotree with boardId:", boardId);
    if (!boardId) {
      console.error("❌ Error: boardId is undefined or null!");
      return;
    }
    router.push({
      pathname: "/(root)/(manu)/(deposit)/infotree",
      params: { boardId: boardId.toString() },
    });
  };

  const handleNavigateToEditBoard = (board: Board) => {
    router.push({
      pathname: "/(root)/(manu)/(deposit)/editBoard",
      params: {
        boardId: board.id.toString(),
        latitude: board.latitude.toString(),
        longitude: board.longitude.toString(),
      },
    });
  };
  

  const renderBoard = ({ item }: { item: Board }) => (
    <View style={styles.card}>
      <Image source={require("../../../../assets/images/tree.png")} style={styles.boardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.boardTitle}>🌲 Board ID: {item.id}</Text>
        <Text style={styles.boardText}>📍 Lat: {item.latitude.toFixed(5)}</Text>
        <Text style={styles.boardText}>📍 Lon: {item.longitude.toFixed(5)}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => handleNavigateToEditBoard(item)}>
  <Ionicons name="create-outline" size={24} color="#FFFFFF" />
</TouchableOpacity>

    </View>
  );

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
        <Text style={{ color: "red" }}>เกิดข้อผิดพลาด: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBoard}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#A5D6A7",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#388E3C",
    alignItems: "center",
  },
  boardImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  boardText: {
    fontSize: 14,
    color: "#2E7D32",
    marginTop: 2,
  },
  editButton: {
    backgroundColor: "#FFA000",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
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
});
