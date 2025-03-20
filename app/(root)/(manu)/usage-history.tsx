// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const UsageHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchUsageHistory();
//   }, []);

//   const fetchUsageHistory = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/usage-history");
//       const data = await response.json();
//       setHistory(data);
//     } catch (error) {
//       console.error("Error fetching usage history:", error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={history}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.historyCard}>
//             <Text style={styles.historyText}>📦 ตู้: {item.locker}</Text>
//             <Text style={styles.historyText}>⏳ ฝากของ: {item.depositTime}</Text>
//             <Text style={styles.historyText}>✅ รับคืน: {item.returnTime}</Text>
//             <Text style={styles.statusText}>🔹 สถานะ: {item.status}</Text>
//           </View>
//         )}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>ไม่มีประวัติการใช้งาน</Text>
//           </View>
//         }
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   );
// };

// export default UsageHistory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#85CCCC',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   listContainer: {
//     paddingHorizontal: 10,
//   },
//   historyCard: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     borderWidth: 1,
//     borderColor: '#DCDCDC',
//   },
//   historyText: {
//     fontSize: 16,
//     color: '#333333',
//     marginBottom: 3,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#00796B',
//     marginTop: 5,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#999999',
//     fontStyle: 'italic',
//   },
// });
