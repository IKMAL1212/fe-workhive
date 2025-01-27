import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

interface Community {
  title: string;
  image: any; // Menggunakan 'any' karena require() akan mengembalikan objek
}

const communities: Community[] = [
  {
    title: 'Design Community',
    image: require('../../../assets/community/design.png'),
  },
  {
    title: 'Game Developer Community',
    image: require('../../../assets/community/game.png'),
  },
  {
    title: 'Programmer Community',
    image: require('../../../assets/community/programmer.png'),
  },
  {
    title: 'Web Developer Community',
    image: require('../../../assets/community/web.png'),
  },
  {
    title: 'Team Project Community',
    image: require('../../../assets/community/project.png'),
  },
  {
    title: 'App Developer Community',
    image: require('../../../assets/community/app.png'),
  },
  {
    title: 'Music Developer Community',
    image: require('../../../assets/community/music.png'),
  },
  {
    title: 'Robotic Community',
    image: require('../../../assets/community/robotic.png'),
  },
  {
    title: 'AI Community',
    image: require('../../../assets/community/ai.png'),
  },
  {
    title: 'Database Community',
    image: require('../../../assets/community/database.png'),
  },
  {
    title: 'NetWork Community',
    image: require('../../../assets/community/network.png'),
  },
  {
    title: 'Study Online Community',
    image: require('../../../assets/community/study.png'),
  },
];

const CommunityChannelScreen = ({ navigation }: any) => {
  const handleGetStarted = (community: Community) => {
    if (community.title === 'Programmer Community') {
      navigation.navigate('CommunityDetailScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>WorkHive Community</Text>
      </View>
      
      <ScrollView>
        <View style={styles.grid}>
          {communities.map((community: Community, index: number) => (
            <View key={index} style={styles.card}>
              <Image
                source={community.image}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{community.title}</Text>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => handleGetStarted(community)}
                >
                  <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {/* Bottom navigation content */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  card: {
    width: '48%',
    aspectRatio: 4 / 3,
    margin: '1%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  centerNavItem: {
    alignItems: 'center',
  },
  centerButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4E6EE3',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,
  },
  navText: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 4,
  },
});

export default CommunityChannelScreen;
