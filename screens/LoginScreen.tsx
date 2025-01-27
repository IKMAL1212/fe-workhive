import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URI from '../config/config';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { setUserId } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URI}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
    if (response.ok) {
      await AsyncStorage.setItem("access_token", data.accessToken);
      await AsyncStorage.setItem("refresh_token", data.refreshToken);
      setUserId(data.userId);
      navigation.navigate("Main");
    } else {
      Alert.alert("Error", data.message);
    }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/images/main_bg.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo/logo.png")}
              style={styles.logo}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Let’s get you Login!</Text>
          <Text style={styles.subtitle}>Enter your information below</Text>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/logo/google.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/logo/apple.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.divider} />
          </View>

          {/* Email and Password Input */}
          <View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
              ]}
              placeholder="Enter Email"
              placeholderTextColor={
                focusedInput === "email" ? "#4E6EE3" : "#999"
              }
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={[
                styles.input,
                focusedInput === "password" && styles.inputFocused,
              ]}
              placeholder="Enter Password"
              placeholderTextColor={
                focusedInput === "password" ? "#4E6EE3" : "#999"
              }
              secureTextEntry
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity>
              <Text
                style={styles.forgotPassword}
                onPress={() => navigateTo("ForgotPassword")}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <Text style={styles.registerText}>
            Don’t have an account?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigateTo("Register")}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginLeft: -32,
    marginTop: 64,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 36,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
    color: "#000",
  },
  inputFocused: {
    borderColor: "#4E6EE3",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#4E6EE3",
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: "#4E6EE3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 110,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "#4E6EE3",
    fontWeight: "bold",
  },
});

export default LoginScreen;