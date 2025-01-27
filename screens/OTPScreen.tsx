import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import API_URI from "../config/config";

interface Props {
  route: RouteProp<RootStackParamList, "EnterOtp">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const OTPScreen: React.FC<Props> = ({ route, navigation }) => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { email, passwordResetToken } = route.params;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URI}/auth/forgot-password-verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forgot_token: passwordResetToken,
          forgot_code: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

    if (data.success) {
      navigation.navigate("NewPassword", {
        email: email,
        otp: otp,
      });
    }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(`${API_URI}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setTimeLeft(60);
        Alert.alert("Success", "OTP resent successfully");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleTextChange = (text: string, index: number) => {
    setOtp((prev) => prev.slice(0, index) + text + prev.slice(index + 1));
    if (text && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP Code</Text>
        <Text style={styles.subtitle}>
          Please check your email for OTP verification code
        </Text>
        <View style={styles.otpContainer}>
          {[...Array(4)].map((_, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, loading && styles.disabledInput]}
              editable={!loading}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otp[index] || ""}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.resendButton, timeLeft > 0 && styles.disabledResend]}
          disabled={timeLeft > 0}
          onPress={handleResend}
        >
          <Text style={styles.resendTitle}>Resend code</Text>
          <Text style={styles.resendText}>{formatTime(timeLeft)}</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/otp.png")}
          style={styles.image}
        />
        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.disabledButton]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.verifyText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 96,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "left",
    marginBottom: 5,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
  },
  otpInput: {
    width: 75,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C0C0C0",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 10,
  },
  resendButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
  },
  resendText: {
    color: "#4E6EE3",
  },
  resendTitle: {
    color: "#000",
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginVertical: 20,
    marginBottom: 44,
  },
  verifyButton: {
    backgroundColor: "#4E6EE3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
  },
  disabledButton: {
    backgroundColor: "#A5A5A5",
  },
  disabledResend: {
    opacity: 0.5,
  },
});

export default OTPScreen;
