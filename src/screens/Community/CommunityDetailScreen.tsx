import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  CommunityDetail: undefined;
  ChatCommunityScreen: undefined;
  // Add other screens here
};

type CommunityDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CommunityDetail'>;
};

const CommunityDetailScreen = ({ navigation }: CommunityDetailScreenProps) => {
  const mediaImages = [
    require('../../../assets/community/coding1.png'),
    require('../../../assets/community/coding2.png'),
    require('../../../assets/community/coding3.png'),
    require('../../../assets/community/coding4.png'),
    require('../../../assets/community/coding5.png'),
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image 
        source={require('../../../assets/community/programmer.png')}
        style={styles.headerImage}
      />



      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Build your project with other Workhive!
        </Text>
      </View>

      <View style={styles.mediaContainer}>
        <Text style={styles.sectionTitle}>Media</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mediaImages.map((image, index) => (
            <Image 
              key={index}
              source={image}
              style={styles.mediaImage}
            />
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.joinButton}
        onPress={() => {
          navigation.navigate('ChatCommunityScreen');
        }}

      >
        <Text style={styles.joinButtonText}>LETS JOIN!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  headerImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#6B35E8',
  },
  communityInfo: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  members: {
    fontSize: 16,
    color: '#666',
  },
  descriptionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  mediaContainer: {
    padding: 20,
  },
  mediaImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: '#4B6BF5',
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityDetailScreen;