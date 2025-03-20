// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router"; // ใช้ useRouter

// const Onboarding = () => {
//   const router = useRouter(); // เรียกใช้งาน router
  
//   return (
//     <View style={styles.container}>
//       {/* ไอคอนรูปแม่กุญแจ */}
//       <Image
//         source={{
//           uri: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png", // URL ของไอคอนแม่กุญแจ
//         }}
//         style={styles.icon}
//       />
//       {/* ข้อความ "DEPOSIT LOCKER" */}
//       <Text style={styles.text}>PREVENT WOOD</Text>
//       {/* ปุ่ม Welcome */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           router.replace("/sign-in"); // ใช้ replace เพื่อเปลี่ยนหน้า
//         }}
//       >
//         <Text style={styles.buttonText}>Welcome</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#E6FCFF", // สีพื้นหลังฟ้าอ่อน
//   },
//   icon: {
//     width: 150,
//     height: 150, // ขนาดไอคอน
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2B4C7E", // สีน้ำเงิน
//     letterSpacing: 2, // ระยะห่างระหว่างตัวอักษร
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#2B4C7E", // สีพื้นหลังของปุ่ม
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10, // มุมโค้งมน
//   },
//   buttonText: {
//     color: "#FFFFFF", // สีข้อความในปุ่ม
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Onboarding;
