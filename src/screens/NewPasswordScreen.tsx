import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import API_URI from "../config/config";

const NewPasswordScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = route.params;
  const { setUserId } = useAuth();

  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URI}/auth/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        setModalVisible(true);
      }

      setModalVisible(true);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter New Password</Text>
      <Text style={styles.subtitle}>Please enter your new password</Text>

      <Image
        source={require("../../assets/images/newpass.png")}
        style={styles.image}
      />

      <TextInput
        placeholder="New Password"
        secureTextEntry
        style={[styles.input, loading && styles.disabledInput]}
        value={newPassword}
        onChangeText={setNewPassword}
        editable={!loading}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={[styles.input, loading && styles.disabledInput]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.saveButton, loading && styles.disabledButton]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../assets/images/success.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Password Updated Successfully</Text>
            <Text style={styles.modalSubtitle}>
              Your password has been updated successfully
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.modalButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 90,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "left",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginVertical: 20,
    marginBottom: 20,
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
  saveButton: {
    backgroundColor: "#4E6EE3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4E6EE3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalButtonText: {
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
});

export default NewPasswordScreen;
