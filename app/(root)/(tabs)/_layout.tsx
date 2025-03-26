import { router, Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from "react-native-paper"; // หากคุณใช้ react-native-paper

const TabIcon = ({ name, focused, unreadCount }: { name: string; focused: boolean; unreadCount?: number }) => (
  <View style={styles.iconContainer}>
    <Ionicons name={name} size={30} color={focused ? "#4CAF50" : "#B0BEC5"} />
    {unreadCount > 0 && (
      <Badge style={styles.badge}>{unreadCount}</Badge> // แสดงตัวเลขการแจ้งเตือนที่ยังไม่ได้อ่าน
    )}
  </View>
);

export default function Layout() {
  const unreadCount = 99; // ตัวอย่างจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน (สามารถดึงจาก API หรือ state)

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#B0BEC5',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "หน้าหลัก",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "home" : "home-outline"} focused={focused} />
          ),
        }}
      />

      {/* 📩 Notification */}
      <Tabs.Screen
        name="notification"
        options={{
          title: "แจ้งเตือน",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              name={focused ? "notifications" : "notifications-outline"} 
              focused={focused} 
              unreadCount={unreadCount} // ส่งจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* 👤 Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "โปรไฟล์",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "person" : "person-outline"} focused={focused} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("🔹 Back Button Pressed");
                router.back();
              }}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#E8F5E9", // สีเขียวอ่อน
    paddingBottom: 15,
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderTopWidth: 1,
    borderColor: "#A5D6A7", // สีเขียวอ่อนๆ
  },
  header: {
    backgroundColor: "#E8F5E9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#388E3C",
  },
  backButton: {
    paddingLeft: 20,
  },
  iconContainer: {
    position: "relative",
    width: 30,
    height: 30,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#F44336", // สีแดงสำหรับการแจ้งเตือน
    color: "white",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
});
