import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/logo/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>WorkHive</Text>
        <Text style={styles.subtitle}>Job Portal Community App</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsSection}>
        <Text style={styles.heading}>Continue as</Text>

        {/* Job Seekers */}
        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigateTo('JobSeekers')}
        >
          <Image
            source={require('../../assets/logo/logo.png')}
            style={styles.icon}
          />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>JOB SEEKERS</Text>
            <Text style={styles.optionDescription}>
              Finding a job here never been easier than before
            </Text>
          </View>
        </TouchableOpacity>

        {/* Company */}
        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigateTo('Company')}
        >
          <Image
            source={require('../../assets/logo/logo.png')}
            style={styles.icon}
          />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>COMPANY</Text>
            <Text style={styles.optionDescription}>
              Let’s recruit your great candidate faster here
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  logoSection: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  optionsSection: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D3FD3',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default WelcomeScreen;
