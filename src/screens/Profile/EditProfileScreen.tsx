import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import API_URI from "../../config/config";

interface EditProfileScreenProps {
  navigation: NavigationProp<any>;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: {
    url: string;
  };
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    avatar: { url: "" },
  });
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const { setUserId } = useAuth();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const response = await fetch(`${API_URI}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          setUserId(null);
          navigation.navigate("Login");
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setProfile(data.user);
          setProfileLoading(false);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load profile data");
        setProfileLoading(false);
      }
    };

    getUserProfile();
  }, [navigation, setUserId]);

  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;

        setProfile((prev) => ({
          ...prev,
          avatar: { url: imageUri },
        }));
        await updateProfilePicture(base64Image);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const updateProfilePicture = async (base64Image: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(`${API_URI}/users/update-avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: base64Image,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      Alert.alert("Success", "Profile picture updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(`${API_URI}/users/update-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4B70E2" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.imageContainer}
            disabled={loading}
          >
            <Image
              source={
                profile.avatar?.url
                  ? { uri: profile.avatar.url }
                  : require("../../../assets/Profile/defaultavatar.png")
              }
              style={styles.profileImage}
            />
            <View style={styles.cameraButton}>
              <Icon name="camera-alt" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Enter your name"
          placeholderTextColor="#999999"
          editable={!loading}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={profile.email}
          editable={false}
          placeholder="Enter your email"
          placeholderTextColor="#999999"
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
    marginRight: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
  },
  imageSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4B70E2",
    padding: 8,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    marginLeft: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#000000",
    marginHorizontal: 16,
    marginBottom: 24,
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#666666",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#4B70E2",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default EditProfileScreen;