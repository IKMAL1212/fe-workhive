import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define type for navigation prop
type DiscoverChannelScreenNavigationProp = StackNavigationProp<any>;
type DiscoverChannelScreenRouteProp = RouteProp<any>;

// Update component props
interface Props {
  route: RouteProp<RootStackParamList, "DiscoverChannelScreen">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const DiscoverChannelScreen: React.FC<Props> = ({ navigation }) => {
  const mockData = [
    { id: 1, title: "", image: require("../../../assets/discover/1.png") },
    { id: 2, title: "", image: require("../../../assets/discover/2.png") },
    { id: 3, title: "", image: require("../../../assets/discover/3.png") },
    { id: 4, title: "", image: require("../../../assets/discover/4.png") },
    { id: 5, title: "", image: require("../../../assets/discover/5.png") },
    { id: 6, title: "", image: require("../../../assets/discover/6.png") },
    { id: 7, title: "", image: require("../../../assets/discover/7.png") },
    { id: 8, title: "", image: require("../../../assets/discover/8.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Explore</Text>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Render items in grid */}
        <View style={styles.gridContainer}>
          {mockData.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  backButton: {
    marginTop: 16,
    marginLeft: 8,
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Adjust to fit two cards per row
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
});

export default DiscoverChannelScreen;
