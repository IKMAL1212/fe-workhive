import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


const CommunityScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/community/bg.png')} 
        style={styles.headerBackground}
      />
      
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Explore</Text>
      </View>

      <View style={styles.content}>
        <Image 
          source={require('../../../assets/logo/logo.png')} 
          style={styles.logo}
        />

        <Text style={styles.subtitle}>
          you can se more posts from other people{'\n'}

        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('DiscoverChannelScreen')}>
          <Text style={styles.exploreText}>
          Explore{'\n'}
          </Text>
          </TouchableOpacity>

      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  backText: {
    padding: 1,
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 32,
    lineHeight: 24,
  },
  exploreText: {
    fontSize: 18,
    color: '#4F46E5',
    textAlign: 'center',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  centerButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});


export default CommunityScreen;
