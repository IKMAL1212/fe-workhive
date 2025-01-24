import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const HomeScreen = () => {
  const { userId, setUserId } = useAuth();
  const { userData, refreshUserData } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshUserData();
    });
    return unsubscribe;
  }, [navigation, refreshUserData]);

  return (
    <View style={styles.container}>
      <View style={styles.statusBarBackground} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <TouchableOpacity style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.username}>{userData.name}</Text>
          </View>
          <Image
            source={
              userData.avatar?.url
                ? { uri: userData.avatar.url }
                : require("../../assets/Profile/defaultavatar.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("SearchScreen")}
          activeOpacity={0.7}
        >
          <Icon name="search" size={20} color="#B3B3B3" />
          <TextInput
            placeholder="Search a freelancer or project"
            placeholderTextColor="#B3B3B3"
            style={styles.searchInput}
            editable={false}
          />
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CategoryScreen")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          {[
            { icon: "code-slash", label: "Programming" },
            { icon: "color-palette", label: "Graphic Design" },
            { icon: "desktop", label: "Web Development" },
            { icon: "camera", label: "Photography" },
            { icon: "film", label: "Video Editing" },
            { icon: "musical-notes", label: "Music" },
            { icon: "book", label: "Writing" },
            { icon: "briefcase", label: "Business" },
          ].map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <Icon name={item.icon} size={28} color="#4E6EE3" />
            </View>
          ))}
        </View>

        {/* Popular Services */}
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          <View style={styles.serviceCard}>
            <Icon name="logo-apple" size={30} color="#000" />
            <Text style={styles.serviceTitle}>Sr. Developer</Text>
            <Text style={styles.serviceSubtitle}>Apple</Text>
            <Text style={styles.serviceLocation}>
              <Icon name="location-outline" size={16} color="#888" /> California
            </Text>
          </View>

          <View style={styles.serviceCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Software Engineer</Text>
            <Text style={styles.serviceSubtitle}>Jakarta, Indonesia</Text>
            <Text style={styles.serviceLocation}>
              <Icon name="people-outline" size={16} color="#888" /> 12.5K
            </Text>
          </View>
        </ScrollView>

        {/* Recent Upload */}
        <View style={styles.recentUploadHeader}>
          <Text style={styles.sectionTitle}>Popular Project</Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentUploadsContainer}>
          {[
            {
              title: "E-Commerce Website",
              price: "IDR.1.000.000 - IDR.9.000.000",
              location: "Jakarta, Indonesia",
            },
            {
              title: "Database Engineer",
              price: "IDR.1.500.000 - IDR.4.000.000",
              location: "Bandung, Indonesia",
            },
            {
              title: "Senior Software Engineer",
              price: "IDR.1.900.000 - IDR.12.000.000",
              location: "Pekanbaru, Indonesia",
            },
          ].map((item, index) => (
            <View key={index} style={styles.recentUploadItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.recentUploadImage}
              />
              <View style={styles.uploadDetails}>
                <Text style={styles.uploadTitle}>{item.title}</Text>
                <Text style={styles.uploadPrice}>{item.price}</Text>
                <Text style={styles.uploadLocation}>
                  <Icon name="location-outline" size={16} color="#888" />{" "}
                  {item.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  statusBarBackground: {
    height: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
    backgroundColor: "#4E6EE3",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F9F9FF",
  },
  scrollContent: {
    paddingBottom: 120,
    marginTop: -10,
  },
  horizontalScrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 56,
    backgroundColor: "#4E6EE3",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#fff",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -20,
    padding: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#4E6EE3",
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    marginLeft: 16,
    color: "#000",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: -54,
  },
  categoryItem: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#F0EFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceCard: {
    width: 200,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  serviceSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  serviceLocation: {
    fontSize: 12,
    color: "#888",
  },
  recentUploadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  moreText: {
    fontSize: 14,
    color: "#4E6EE3",
  },
  recentUploadsContainer: {
    paddingBottom: 16,
  },
  recentUploadItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recentUploadImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  uploadDetails: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  uploadPrice: {
    fontSize: 14,
    color: "#4E6EE3",
  },
  uploadLocation: {
    fontSize: 12,
    color: "#555",
  },
  serviceImage: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;