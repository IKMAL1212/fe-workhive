import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#A1A1A1" />
      <TextInput
        placeholder="Search job here..."
        style={styles.input}
        placeholderTextColor="#A1A1A1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});

export default SearchBar;
