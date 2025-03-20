// import { useRouter, useLocalSearchParams } from "expo-router";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import React, { useState } from "react";

// export default function OpenPage() {
//   const router = useRouter(); // ✅ ใช้ router สำหรับเปลี่ยนหน้า
//   const { lockerId, slotId } = useLocalSearchParams(); // ✅ รับค่าจาก URL Parameters
//   const [isOpening, setIsOpening] = useState(false);

//   const handleOpenLocker = async () => {
//     setIsOpening(true);
//     try {
//       const payload = {
//         topic: "com1/controlldoorlock", // ✅ ตั้งค่า Topic สำหรับ MQTT
//         message: {
//           door: "door1", // ✅ ใช้ lockerId เป็นค่า door
//           action: "unlock",
//         },
//       };

//       console.log("📤 [Payload]:", payload);

//       const response = await fetch("http://172.20.10.2:8080/user-service/api/publish", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           topic: "com1/controlldoorlock",
//           message: { door: "door1", action: "unlock" },
//         }),
//       });
//       const text = await response.text(); // 📌 ลองใช้ `.text()` แทน `.json()`
//       console.log("🔍 [Raw Response]:", text);
//       const result = await response.json();
//       if (response.ok) {
//         alert("✅ ตู้เปิดเรียบร้อยแล้ว!");
//         // ✅ เปลี่ยนไปหน้าสำเร็จ
//       } else {
//         alert("❌ Error: " + result.message);
//       }
//     } catch (error) {
//       console.error("❌ Error opening locker:", error);
//       alert("❌ ไม่สามารถเปิดตู้ได้");
//     }
//     setIsOpening(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.body}>
//         <Text style={styles.text}>
//           ตู้ {lockerId} - ช่อง {slotId}
//         </Text>
//         <View style={styles.headerimage}>
//           <Image source={require("../../../../assets/images/open.png")} />
//         </View>
//         <Text style={styles.text}>Click to open the door</Text>

//         <View style={styles.row}>
//           <TouchableOpacity
//             style={styles.buttonOpen}
//             onPress={handleOpenLocker}
//             disabled={isOpening}
//           >
//             <Text style={styles.buttonttext}>
//               {isOpening ? "Opening..." : "Open"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   body: { paddingTop: 100, justifyContent: "center", alignItems: "center" },
//   text: { fontSize: 24, color: "#85CCCC", marginTop: 20 },
//   row: {
//     width: "100%",
//     justifyContent: "center",
//     flexDirection: "row",
//     marginTop: 20,
//   },
//   buttonttext: { color: "#fff", fontSize: 20, fontWeight: "bold" },
//   buttonOpen: {
//     backgroundColor: "#85CCCC",
//     paddingVertical: 9,
//     borderRadius: 11,
//     alignItems: "center",
//     height: 50,
//     width: "40%",
//   },
//   headerimage: { marginTop: 2, alignItems: "center", justifyContent: "center" },
// });
