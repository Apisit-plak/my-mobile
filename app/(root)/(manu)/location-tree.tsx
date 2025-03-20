import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const defaultCenter = {
  latitude: 14.038907551768144, // Bangkok
  longitude: 100.72718945360457,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function LocationTree() {
  const params = useLocalSearchParams();
  const selectedLat = params.lat ? parseFloat(params.lat) : null;
  const selectedLon = params.lon ? parseFloat(params.lon) : null;

  const [treeLocations, setTreeLocations] = useState([]); // ✅ เก็บพิกัดจาก API
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null); // ✅ ใช้ Ref เพื่อควบคุม MapView

  useEffect(() => {
    console.log("📡 Fetching Tree Locations from API...");
    
    axios.get("http://172.20.10.2:8080/Tree888") // ✅ ใช้ API จริง
      .then((response) => {
        console.log("📊 API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const trees = response.data.data.map((tree) => ({
            id: tree.id,
            latitude: parseFloat(tree.latitude),
            longitude: parseFloat(tree.longitude),
          }));
          setTreeLocations(trees);
        } else {
          console.error("❌ Invalid API response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedLat && selectedLon && mapRef.current) {
      console.log(`📍 รับค่าพิกัดจาก Notification: Lat ${selectedLat}, Lon ${selectedLon}`);
      
      // ✅ ซูมไปยังพิกัดที่กดจาก Notification
      mapRef.current.animateToRegion({
        latitude: selectedLat,
        longitude: selectedLon,
        latitudeDelta: 0.01, // ✅ ซูมเข้าใกล้กว่าเดิม
        longitudeDelta: 0.01,
      }, 1000); // 1 วินาที
    }
  }, [selectedLat, selectedLon]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูลแผนที่...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef} // ✅ ผูก Ref กับ MapView
        style={styles.mapContainer} 
        initialRegion={selectedLat && selectedLon ? {
          latitude: selectedLat,
          longitude: selectedLon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : defaultCenter}
      >
        {/* ✅ แสดงพิกัดจาก API */}
        {treeLocations.map((tree) => (
          <Marker
            key={tree.id}
            coordinate={{ latitude: tree.latitude, longitude: tree.longitude }}
            title={`ต้นไม้ ID: ${tree.id}`}
            description={`Lat: ${tree.latitude}, Lon: ${tree.longitude}`}
          />
        ))}

        {/* ✅ แสดงพิกัดที่กดมาจาก NotificationScreen */}
        {selectedLat !== null && selectedLon !== null && (
          <Marker
            coordinate={{ latitude: selectedLat, longitude: selectedLon }}
            title="ตำแหน่งที่แจ้งเตือน"
            description={`Lat: ${selectedLat}, Lon: ${selectedLon}`}
            pinColor="red" // 🔴 เน้นจุดแจ้งเตือน
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  mapContainer: {
    width: "100%",
    height: "90%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});
