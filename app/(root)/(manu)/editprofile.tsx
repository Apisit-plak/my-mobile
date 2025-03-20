import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile } = useLocalSearchParams();
  const [name, setName] = useState(profile?.fullname || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [avatar, setAvatar] = useState(profile?.avatar || "");

  const handleSave = async () => {
    try {
      const response = await fetch("http://172.20.10.2:8080/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, avatar }),
      });

      if (response.ok) {
        Alert.alert("สำเร็จ", "บันทึกข้อมูลเรียบร้อย!");
        router.push("/profile");
      } else {
        Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} color="#85CCCC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    padding: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#85CCCC",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 20,
    backgroundColor: "#85CCCC",
    padding: 8,
    borderRadius: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: "#85CCCC",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#85CCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#E0FFFF",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  cancelButton: {
    backgroundColor: "#FF6666",
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#85CCCC",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
