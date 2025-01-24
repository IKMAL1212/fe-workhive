import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  image: any;
}

interface SearchScreenProps {
  navigation: NavigationProp<any>;
}

const jobData: Job[] = [
  {
    id: '1',
    title: 'Graphic Designer',
    salary: 'IDR. 3.110.000/project',
    location: 'Pekanbaru',
    image: require('../../../assets/logo/logo.png'),
  },
  {
    id: '2',
    title: 'Video Designer',
    salary: 'IDR. 2.200.000/project',
    location: 'Jakarta',
    image: require('../../../assets/logo/logo.png'),
  },
  {
    id: '3',
    title: 'App Designer',
    salary: 'IDR. 8.000.000/project',
    location: 'Jakarta',
    image: require('../../../assets/logo/logo.png'),
  },
];

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('UI/UX Designer');
  const filters = ['Full-Time', 'Senior', 'Remote'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search jobs..."
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options" size={20} color="#4B7BF5" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal style={styles.filtersContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterChip}
          >
            <Text style={styles.filterText}>{filter}</Text>
            <Icon name="close" size={16} color="#000" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.jobList}>
        {jobData.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => navigation.navigate('SearchDetailScreen')}
          >
            <Image source={job.image} style={styles.jobImage} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobSalary}>{job.salary}</Text>
              <View style={styles.locationContainer}>
                <Icon name="location" size={16} color="#666" />
                <Text style={styles.locationText}>{job.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B7BF5',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    marginRight: 8,
    fontSize: 14,
  },
  jobList: {
    padding: 16,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  jobImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  jobInfo: {
    flex: 1,
    marginLeft: 16,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 14,
    color: '#4B7BF5',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
  },
});

export default SearchScreen;