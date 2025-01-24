import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobStats: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.applied]}>
        <Text style={styles.number}>29</Text>
        <Text style={styles.label}>Jobs Applied</Text>
      </View>
      <View style={[styles.card, styles.interviews]}>
        <Text style={styles.number}>3</Text>
        <Text style={styles.label}>Interviews</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    width: '45%',
    padding: 20,
    borderRadius: 10,
  },
  applied: {
    backgroundColor: '#6C63FF',
  },
  interviews: {
    backgroundColor: '#64C7FF',
  },
  number: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
});

export default JobStats;
