import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import { View, Text, Button, Alert, ScrollView } from "react-native";

const SERVER_IP = "172.20.10.2"; // ✅ ใช้ IP Address ของเครื่องที่รัน Spring Boot
const WS_URL = `http://${SERVER_IP}:8080/ws`;
const API_URL = `http://${SERVER_IP}:8080/alerts`;

export default function App() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000, // ✅ Auto Reconnect ทุก 5 วินาที
      onConnect: () => {
        console.log("✅ WebSocket Connected!");
        client.subscribe("/topic/alerts", (message) => {
          console.log("📩 Received Alert:", message.body);
          Alert.alert("🚨 แจ้งเตือน!", message.body);
          setAlerts((prevAlerts) => [...prevAlerts, message.body]);
        });
      },
      onDisconnect: () => console.log("❌ WebSocket Disconnected!"),
      onStompError: (frame) => console.error("❌ STOMP Error:", frame),
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch alerts");
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error("❌ Error fetching alerts:", error);
      Alert.alert("Error", "ไม่สามารถโหลดข้อมูลแจ้งเตือนได้");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="โหลดข้อมูลแจ้งเตือน" onPress={fetchAlerts} />
      <ScrollView style={{ marginTop: 20, maxHeight: 400 }}>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Text key={index} style={{ marginVertical: 5, padding: 10, backgroundColor: '#eee', borderRadius: 5 }}>
              {alert}
            </Text>
          ))
        ) : (
          <Text>ไม่มีการแจ้งเตือน</Text>
        )}
      </ScrollView>
    </View>
  );
}