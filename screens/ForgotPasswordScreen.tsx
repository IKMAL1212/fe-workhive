import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import API_URI from "../config/config";

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URI}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.success) {
        navigation.navigate("EnterOtp", {
          email,
          passwordResetToken: data.passwordResetToken,
        });
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}

      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Select which contact details should we use to reset your password
      </Text>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/forgot_password.png")}
          style={styles.image}
        />
      </View>
      <TextInput
        style={[styles.input, focusedInput === "email" && styles.inputFocused]}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={focusedInput === "email" ? "#4E6EE3" : "#666"}
        keyboardType="email-address"
        onFocus={() => setFocusedInput("email")}
        onBlur={() => setFocusedInput(null)}
        autoCapitalize="none"
      />

      {/* Reset Password Button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
        disabled={!email.trim() || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
        )}
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>BACK TO LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 360,
    height: 360,
    resizeMode: "contain",
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginBottom: 30,
  },
  inputFocused: {
    borderColor: "#4E6EE3",
  },
  resetButton: {
    backgroundColor: "#4E6EE3",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  resetButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#4E6EE3",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4E6EE3",
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
