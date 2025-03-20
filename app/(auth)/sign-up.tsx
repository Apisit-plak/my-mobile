import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { fetchAPI } from "@/lib/fetch";

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const onSignUpPress = async () => {
    if (!isValidEmail(form.email)) {
      setError("Invalid email format.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetchAPI("/api/create/users", {
        method: "POST",
        data: form,
      })

      if (response) {
        Alert.alert("Success", "Account created successfully!");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.imag1}
            source={require("../../assets/images/safe.png")}
          />
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create your new account</Text>
        </View>

        <View style={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <InputField
            label="Email"
            labelStyle={styles.textfrom}
            placeholder="@gmail.com"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="First name"
            labelStyle={styles.textfrom}
            placeholder="First name"
            value={form.firstName}
            onChangeText={(value) => setForm({ ...form, firstName: value })}
          />
          <InputField
            label="Last name"
            labelStyle={styles.textfrom}
            placeholder="Last name"
            value={form.lastName}
            onChangeText={(value) => setForm({ ...form, lastName: value })}
          />
          <InputField
            label="Phone"
            labelStyle={styles.textfrom}
            placeholder="Phone"
            value={form.phone}
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />
          <InputField
            label="Password"
            labelStyle={styles.textfrom}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <InputField
            label="Confirm Password"
            labelStyle={styles.textfrom}
            placeholder="Confirm Password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(value) =>
              setForm({ ...form, confirmPassword: value })
            }
          />
        </View>

        <CustomButton
          title={loading ? "Creating..." : "Create Account"}
          onPress={onSignUpPress}
          style={styles.button}
          disabled={loading}
        />

        <View style={styles.row}>
          <Text style={styles.loginText}>Don't have an account yet? </Text>
          <Link href="/sign-in" style={styles.loginLink}>
            Login
          </Link>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  safeArea: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 32,
    color: '#85CCCC',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#85CCCC',
    textAlign: 'center',
  },
  textfrom: {
    fontSize: 14,
    color: '#85CCCC',
    marginBottom: 5,
  },
  form: {
    width: '100%',
  },
  button: {
    backgroundColor: '#85CCCC',
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 12,
    color: '#A8A8A8',
  },
  loginLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#85CCCC',
  },
  imag1: {
    height: 90,
    width: 90,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUp;
