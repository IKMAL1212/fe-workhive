import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define RootStackParamList here
type RootStackParamList = {
  CategoryScreen: undefined;
  CategoryChannelScreen: { categoryId: number };
  CategoryAppScreen: { categoryId: number }; // New screen for App Dev
};

type CategoryCardProps = {
  title: string;
  jobs: number;
  icon: string;
  isActive?: boolean;
  onPress: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, jobs, icon, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.card, isActive && styles.activeCard]}
    onPress={onPress}
  >
    <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
      <Icon name={icon} size={24} color={isActive ? "#FFFFFF" : "#4E6EE3"} />
    </View>
    <Text style={[styles.cardTitle, isActive && styles.activeText]}>{title}</Text>
    <Text style={[styles.jobCount, isActive && styles.activeText]}>{jobs} Jobs</Text>
  </TouchableOpacity>
);

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const categories = [
    { id: 1, title: "Website Design", jobs: 140, icon: "globe-outline", isActive: true },
    { id: 2, title: "App Dev", jobs: 250, icon: "phone-portrait-outline" },
    { id: 3, title: "Web Dev", jobs: 120, icon: "code-slash-outline" },
    { id: 4, title: "Game Dev", jobs: 85, icon: "game-controller-outline" },
    { id: 5, title: "AI Dev", jobs: 235, icon: "brain-outline" },
    { id: 6, title: "Software Dev", jobs: 412, icon: "desktop-outline" },
  ];

  const navigateToCategoryChannel = (categoryId: number, categoryTitle: string) => {
    if (categoryTitle === "App Dev") {
      navigation.navigate("CategoryAppScreen", { categoryId });
    } else {
      navigation.navigate("CategoryChannelScreen", { categoryId });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      <Text style={styles.title}>Category</Text>

      <ScrollView style={styles.cardContainer}>
        <View style={styles.grid}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              title={category.title}
              jobs={category.jobs}
              icon={category.icon}
              isActive={category.isActive}
              onPress={() => navigateToCategoryChannel(category.id, category.title)} 
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FF",
    padding: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    top: -16, 
    left: 10, 
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    paddingHorizontal: 26,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  cardContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  activeCard: {
    backgroundColor: "#4E6EE3",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F3FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  jobCount: {
    fontSize: 14,
    color: "#666666",
  },
  activeText: {
    color: "#FFFFFF",
  },
});

export default CategoryScreen;
