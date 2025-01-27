import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Page = {
  id: string;
  image: any;
  title: string;
  description: string;
};

const pages: Page[] = [
  {
    id: "1",
    image: require("../../assets/images/landing1.png"),
    title: "Find Various Project Here!",
    description: "Create applications and website for your company.",
  },
  {
    id: "2",
    image: require("../../assets/images/landing2.png"),
    title: "Join The Community!",
    description:
      "The company will provide broader insights, and your relationship wioll grow even more.",
  },
  {
    id: "3",
    image: require("../../assets/images/landing3.png"),
    title: "You Can Also Offer Project Here!",
    description:
      "Offer your project to the others as a side job to earn extra profit.",
  },
];

interface LandingScreenProps {
  navigation: {
    navigate: (route: string) => void;
  };
}

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item }: { item: Page }) => (
    <View style={styles.pageContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentOffset={{ x: currentIndex * width, y: 0 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]}
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        >
          <Text style={styles.navText}>←</Text>
        </TouchableOpacity>
        <View style={styles.indicatorContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 80,
    marginBottom: 56,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    marginBottom: -90,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
    marginBottom: 64,
  },
  navButton: {
    backgroundColor: '#4E6EE3',
    borderRadius: 50,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 30,
    height: 7,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#4E6EE3',
  },
});

export default LandingScreen;
