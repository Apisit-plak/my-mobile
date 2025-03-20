
import { router } from "expo-router";
import { Alert, Image, Text, View, StyleSheet } from "react-native";


const OAuth = () => {
  
  return (
    <View>
      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0", // Replace with your color code
  },
  orText: {
    fontSize: 18,
    color: "#000", // Replace with your color code
  },
  googleButton: {
    marginTop: 20,
    width: "100%",
    shadowColor: "transparent",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
});

export default OAuth;
