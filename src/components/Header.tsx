import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.name}>Henry Kanwil</Text>
      </View>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100' }}
        style={styles.profilePic}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6C63FF',
    padding: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Header;
