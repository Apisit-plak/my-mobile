import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        //  headerTintColor: "#85CCCC",
      }}
    >
      <Stack.Screen
  name="(deposit)/listtree"
  options={{
    title: "เลือกต้นไม้ที่มีอยู่",
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => router.push("/(root)/(manu)/(deposit)/addTree")} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={30} color="#4CAF50" />
      </TouchableOpacity>
    ),
  }}
/>

<Stack.Screen
  name="(deposit)/editBoard"
  options={{
    title: "แก้ไขบอร์ด",
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
      </TouchableOpacity>
    ),
    
  }}
/>

<Stack.Screen
  name="(deposit)/historyNotification"
  options={{
    title: "ประวัติการแจ้งเตือน",
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
      </TouchableOpacity>
    ),
  }}
/>


<Stack.Screen
  name="(deposit)/addTree"
  options={{
    title: "เพิ่มต้นไม้",
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
      </TouchableOpacity>
    ),
  }}
/>




      <Stack.Screen
        name="(return)/return"
        options={{
          title: "Return",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#85CCCC" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="usage-history"
        options={{
          title: "Usage History",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#85CCCC" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(deposit)/infotree"
        options={{
          title: "รายละเอียดต้นไม้",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/(root)/(manu)/(deposit)/listtree")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>
          ),
        }}
    />
      <Stack.Screen
        name="location-tree"
        options={{
          title: "แผนที่แสดง",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(deposit)/open"
        options={{
          title: "open",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/(root)/(manu)/(deposit)/infotree")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#85CCCC" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(return)/recipient"
        options={{
          title: "รับคืน",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/(root)/(manu)/(return)/return")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#85CCCC" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(return)/otp"
        options={{
          title: "กรอกรหัส",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/(root)/(manu)/(return)/recipient")} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color="#85CCCC" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C8E6C9",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  backButton: {
    paddingLeft: 10,
  },
  
});

export default Layout;
