// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native';

// const Recommend = () => {
//   const [form, setForm] = useState({ description: "" });
//   const API_BASE_URL = "http://172.20.10.2:8080/user-service";

//   const handleSubmit = async () => {
//     if (!form.description.trim()) {
//       Alert.alert("Error", "กรุณากรอกความคิดเห็นก่อนส่ง");
//       return;
//     }

//     try {
//       let token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Error", "กรุณา Login ใหม่");
//         return;
//       }

//       token = token.trim(); // ✅ ลบช่องว่างที่อาจทำให้เกิด Error
//       console.log("🔹 Sending Token:", token);

//       const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`, // ✅ ใช้ `trim()` ป้องกันช่องว่าง
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ description: form.description }),
//       });

//       console.log("🔹 API Response Status:", response.status);
//       const responseText = await response.text();
//       console.log("🔹 Raw Response:", responseText);

//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (error) {
//         console.error("❌ API did not return JSON:", responseText);
//         Alert.alert("Error", "API ไม่ได้ส่ง JSON กลับมา หรือ API อาจไม่ถูกต้อง");
//         return;
//       }

//       console.log("✅ API Response JSON:", result);

//       if (response.ok) {
//         Alert.alert("Success", "ความคิดเห็นของคุณถูกส่งแล้ว!");
//         setForm({ description: "" });
//       } else {
//         Alert.alert("Error", result.message || "เกิดข้อผิดพลาดในการส่งความคิดเห็น");
//       }
//     } catch (error) {
//       console.error("❌ Error sending recommendation:", error);
//       Alert.alert("Error", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>แสดงความคิดเห็นเกี่ยวกับตู้</Text>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.input} // ✅ ใช้ styles.input เพื่อปรับขนาดใหญ่ขึ้น
//           placeholder="เขียนความคิดเห็นของคุณที่นี่..."
//           placeholderTextColor="#85CCCC"
//           textContentType="none"
//           multiline={true} // ✅ ให้ป้อนข้อความหลายบรรทัด
//           numberOfLines={10}
//           value={form.description}
//           onChangeText={(value) => setForm({ ...form, description: value })}
//         />
//       </View>

//       <View style={styles.rowRecommend}>
//         <TouchableOpacity style={styles.buttonRecommendLeft}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.buttonRecommendRight} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Recommend;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 20,
//   },
//   header: {
//     paddingTop: 30,
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#85CCCC",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   form: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: "#85CCCC",
//     backgroundColor: "#F5F5F5",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     fontSize: 16,
//     height: 180, // ✅ ปรับให้เป็นกล่องใหญ่ขึ้น
//     textAlignVertical: "top", // ✅ ให้ข้อความเริ่มพิมพ์จากบนลงล่าง
//   },
//   rowRecommend: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   buttonRecommendRight: {
//     backgroundColor: "#85CCCC",
//     borderRadius: 11,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     width: "45%",
//   },
//   buttonRecommendLeft: {
//     backgroundColor: "rgba(133, 204, 204, 0.5)",
//     borderRadius: 11,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     width: "45%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
