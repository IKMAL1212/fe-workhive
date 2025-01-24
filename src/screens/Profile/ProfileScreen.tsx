import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  ImageBackground,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import API_URI from "../../config/config";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = width * 0.5;

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

interface SettingItemProps {
  icon: string;
  title: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  rightElement,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingItemLeft}>
      <Icon name={icon} size={24} color="#333" />
      <Text style={styles.settingItemText}>{title}</Text>
    </View>
    {rightElement || <Icon name="chevron-right" size={24} color="#333" />}
  </TouchableOpacity>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isPushEnabled, setPushEnabled] = React.useState(true);
  const [isDarkMode, setDarkMode] = React.useState(false);
  const { userData, refreshUserData } = useUser();
  const { setUserId } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshUserData();
    });
    return unsubscribe;
  }, [navigation, refreshUserData]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      setUserId(null);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Background Image Header */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../../../assets/Profile/bg.png")}
          style={styles.backgroundImage}
        />
        {/* Profile Section that overlaps the background */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                userData.avatar?.url
                  ? { uri: userData.avatar.url }
                  : require("../../../assets/Profile/defaultavatar.png")
              }
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.location}>Indonesia, Pekanbaru</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Not yet paid</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Work Process</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* My Workhive Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Workhive Settings</Text>
          <SettingItem
            icon="edit"
            title="Edit profile"
            onPress={() => navigation.navigate("EditProfileScreen")}
          />
          <SettingItem
            icon="lock"
            title="Change password"
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          />
          <SettingItem icon="payment" title="Add a payment method" />
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Icon name="notifications" size={24} color="#333" />
              <Text style={styles.settingItemText}>Push notifications</Text>
            </View>
            <Switch
              value={isPushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#767577", true: "#4B70E2" }}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Icon name="nights-stay" size={24} color="#333" />
              <Text style={styles.settingItemText}>Dark mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#4B70E2" }}
            />
          </View>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <SettingItem icon="help" title="Support" />
          <SettingItem icon="groups" title="Community and legal" />
          <SettingItem icon="store" title="Become a Seller" />
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <SettingItem icon="info" title="About us" />
          <SettingItem icon="privacy-tip" title="Privacy policy" />
          <SettingItem icon="description" title="Terms and conditions" />
        </View>

        {/* Seller Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <SettingItem icon="home" title="Home Page" />
        </View>

        {/* Logout Section */}
        <View style={[styles.section, styles.logoutSection]}>
          <SettingItem
            icon="logout"
            title="Logout"
            onPress={handleLogout}
            rightElement={null}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 120, // Increased padding to account for bottom navigator
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  profileSection: {
    position: "absolute",
    padding: 10,
    bottom: -110,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginTop: 103,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#333",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  logoutSection: {
    marginBottom: 0,
  },
});

export default ProfileScreen;