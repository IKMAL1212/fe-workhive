import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CommunityProfileScreen = () => {
  const navigation = useNavigation();
  
  const images = {
    media: [
      require('../../../assets/community/coding1.png'),
      require('../../../assets/community/coding2.png'),
      require('../../../assets/community/coding3.png'),
      require('../../../assets/community/coding4.png'),
      require('../../../assets/community/coding5.png'),
    ],
    files: [
      require('../../../assets/community/coding5.png'),
      require('../../../assets/community/coding4.png'),
      require('../../../assets/community/coding3.png'),
      require('../../../assets/community/coding2.png'),
      require('../../../assets/community/coding1.png'),
    ]
  };

  const renderImageSection = (title: string, images: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.mediaItem} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.profileHeader}>
          <Image source={require('../../../assets/community/programmer.png')} style={styles.banner} />
          <Text style={styles.communityName}>Programmer Community</Text>
          <Text style={styles.memberCount}>30,294 People</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="notifications" size={24} color="#666" />
            <Text>silent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chatbubble-outline" size={24} color="#666" />
            <Text>silent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="exit" size={24} color="#666" />
            <Text>out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="ellipsis-horizontal" size={24} color="#666" />
            <Text>other</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>Build your project with other Workhive!</Text>
        </View>

        {renderImageSection('Media', images.media)}
        {renderImageSection('File', images.files)}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Link</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: -10,
    padding: 0,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  communityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  memberCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
  mediaItem: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
});

export default CommunityProfileScreen;