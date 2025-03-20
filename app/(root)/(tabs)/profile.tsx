import { useRouter } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token || token === "null") {
        Alert.alert("Error", "กรุณา Login ใหม่");
        router.replace("/login");
        return;
      }

      let userId;
      try {
        const decoded = jwtDecode(token.replace("Bearer ", ""));
        userId = decoded?.id;
      } catch (error) {
        Alert.alert("Error", "โทเค็นไม่ถูกต้อง กรุณา Login ใหม่");
        router.replace("/login");
        return;
      }

      if (!userId) {
        Alert.alert("Error", "โทเค็นไม่ถูกต้อง กรุณา Login ใหม่");
        router.replace("/login");
        return;
      }

      const response = await fetch(`http://172.20.10.2:8080/profile/${userId}`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      Alert.alert("Error", "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณา Login ใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/sign-in");
  };

  if (loading) return <ActivityIndicator size="large" color="#2E7D32" style={styles.loading} />;
  if (!profile) return <Text style={styles.errorText}>โปรด Login ใหม่</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <Image source={require("../../../assets/images/profile.png")} style={styles.avatar} />
        <Text style={styles.email}>{profile.email}</Text>
        <View style={styles.infoContainer}>
          <Ionicons name="person-outline" style={styles.icon} />
          <Text style={styles.value}>Username: {profile.userName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="person-outline" style={styles.icon} />
          <Text style={styles.value}>Name: {profile.firstName} {profile.lastName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="call-outline" style={styles.icon} />
          <Text style={styles.value}>{profile.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.centeredRow}>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#2E7D32",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  icon: {
    fontSize: 20,
    color: "#2E7D32",
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  centeredRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonLogout: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
