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
  route: RouteProp<RootStackParamList, "ActivateAccountScreen">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const ActivateAccountScreen: React.FC<Props> = ({ route, navigation }) => {
  const { activationToken } = route.params;
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

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

  const handleActivate = async () => {
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter complete verification code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URI}/auth/activate-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activation_token: activationToken,
          activation_code: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account activated successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Activation Code</Text>
        <Text style={styles.subtitle}>
          Please check your email for Activation verification code
        </Text>

        <View style={styles.otpContainer}>
          {[...Array(4)].map((_, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, isLoading && styles.disabledInput]}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otp[index] || ""}
              editable={!isLoading}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.resendButton, timeLeft > 0 && styles.disabledResend]}
          disabled={timeLeft > 0}
        >
          <Text style={styles.resendTitle}>Resend code</Text>
          <Text style={styles.resendText}>{formatTime(timeLeft)}</Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/otp.png")}
          style={styles.image}
        />

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.disabledButton]}
          onPress={handleActivate}
          disabled={isLoading}
        >
          {isLoading ? (
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
  disabledInput: {
    backgroundColor: "#F5F5F5",
  },
  resendButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
  },
  disabledResend: {
    opacity: 0.5,
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
  disabledButton: {
    backgroundColor: "#A5A5A5",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ActivateAccountScreen;
