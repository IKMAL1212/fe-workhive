import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', icon: <Ionicons name="code-slash" size={24} color="#6C63FF" /> },
  { id: '2', icon: <Ionicons name="brush" size={24} color="#6C63FF" /> },
  { id: '3', icon: <Ionicons name="megaphone" size={24} color="#6C63FF" /> },
  { id: '4', icon: <Ionicons name="language" size={24} color="#6C63FF" /> },
  { id: '5', icon: <Ionicons name="construct" size={24} color="#6C63FF" /> },
  { id: '6', icon: <Ionicons name="briefcase" size={24} color="#6C63FF" /> },
  { id: '7', icon: <Ionicons name="fitness" size={24} color="#6C63FF" /> },
  { id: '8', icon: <Ionicons name="color-palette" size={24} color="#6C63FF" /> },
];

const Categories: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category}>
            {item.icon} {/* Display icons only */}
          </TouchableOpacity>
        )}
        numColumns={4} 
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    marginHorizontal: 10,
  },
});

export default Categories;
