import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Landing: undefined;
};

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Landing');
    }, 3000);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animatable.View
          animation="fadeInUp"
          iterationCount={1}
          duration={1500}
          style={styles.logoContainer}
        >
          <Image
            source={require('../../assets/logo/landing_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>
            WorkHive
          </Text>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    backgroundColor: '#4E6EE3',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -44,
    marginLeft: 5,
  }
});

export default SplashScreen;
