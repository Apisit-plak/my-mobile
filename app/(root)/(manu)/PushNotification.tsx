// import { useState, useEffect } from "react";
// import { View, Text, Button, Alert, ScrollView } from "react-native";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";

// const API_URL = "http://172.20.10.2:8080/alerts"; // ✅ เปลี่ยนเป็น API จริงของคุณ

// async function registerForPushNotificationsAsync(): Promise<string | undefined> {
//   let token: string | undefined;

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       Alert.alert("Failed to get push token for push notification!");
//       return;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log("Expo Push Token:", token);
//   } else {
//     Alert.alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

// const PushNotification = () => {
//   const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => {
//       if (token) setExpoPushToken(token);
//     });
//     fetchAlerts();
//   }, []);

//   const fetchAlerts = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw new Error("Failed to fetch alerts");
//       const data = await response.json();
//       setAlerts(data);
//     } catch (error) {
//       console.error("❌ Error fetching alerts:", error);
//       Alert.alert("Error", "ไม่สามารถโหลดข้อมูลแจ้งเตือนได้");
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
//       <Text>Your Expo Push Token:</Text>
//       <Text>{expoPushToken || "Fetching token..."}</Text>
//       <Button title="โหลดข้อมูลแจ้งเตือน" onPress={fetchAlerts} />
//       <ScrollView style={{ marginTop: 20, maxHeight: 400 }}>
//         {alerts.length > 0 ? (
//           alerts.map((alert, index) => (
//             <Text key={index} style={{ marginVertical: 5, padding: 10, backgroundColor: "#eee", borderRadius: 5 }}>
//               {alert.message} - {new Date(alert.timestamp).toLocaleString()}
//             </Text>
//           ))
//         ) : (
//           <Text>ไม่มีการแจ้งเตือน</Text>
//         )}
//       </ScrollView>
//       <Button
//         title="Test Notification"
//         onPress={async () => {
//           await Notifications.scheduleNotificationAsync({
//             content: {
//               title: "Test Notification",
//               body: "This is a test notification!",
//             },
//             trigger: { seconds: 2 },
//           });
//           Alert.alert("Test Notification Scheduled!");
//         }}
//       />
//     </View>
//   );
// };

// export default PushNotification;