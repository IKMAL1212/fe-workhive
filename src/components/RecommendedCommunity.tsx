import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RecommendedCommunity: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Jobs</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Software Engineer</Text>
          <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
          <Text style={styles.jobSalary}>$500 - $1,000</Text>
        </View>
        {/* Add more job cards here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    width: 200,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobLocation: {
    color: '#A1A1A1',
    marginVertical: 5,
  },
  jobSalary: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});

export default RecommendedCommunity;
