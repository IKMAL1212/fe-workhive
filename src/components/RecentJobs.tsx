import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const recentJobs = [
  {
    id: '1',
    companyLogo: 'https://via.placeholder.com/50x50.png?text=H',
    jobTitle: 'Junior Software Engineer',
    companyName: 'Highspeed Studios',
    location: 'Jakarta, Indonesia',
    salary: '$500 - $1,000',
  },
  {
    id: '2',
    companyLogo: 'https://via.placeholder.com/50x50.png?text=L',
    jobTitle: 'Database Engineer',
    companyName: 'Lunar Djaja Corp.',
    location: 'London, United Kingdom',
    salary: '$500 - $1,000',
  },
  {
    id: '3',
    companyLogo: 'https://via.placeholder.com/50x50.png?text=D',
    jobTitle: 'Senior Software Engineer',
    companyName: 'Darkseer Studios',
    location: 'Medan, Indonesia',
    salary: '$500 - $1,000',
  },
];

const RecentJobs: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.more}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
            <View style={styles.info}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text style={styles.salary}>{item.salary}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  more: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    color: '#A1A1A1',
    marginBottom: 5,
  },
  salary: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  location: {
    color: '#A1A1A1',
    fontSize: 12,
  },
});

export default RecentJobs;
