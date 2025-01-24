import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Feature {
  label: string;
  value: string | number;
}

interface ReviewStat {
  label: string;
  rating: number;
}

interface RelatedGig {
  id: number;
  title: string;
  price: string;
  rating: number;
  reviews: number;
}

interface Review {
  id: number;
  user: {
    name: string;
    country: string;
  };
  comment: string;
}

type RootStackParamList = {
  CategoryDetailScreen: undefined;
  PaymentScreen: undefined;
};

const CategoryDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const features: Feature[] = [
    { label: 'Delivery days', value: '10 days' },
    { label: 'Revisions', value: 'Unlimited' },
    { label: 'Number Pages', value: '✓' },
    { label: 'Fonts & Typography', value: '✓' },
    { label: 'Custom Asset Design', value: 3 },
    { label: 'Responsive Design', value: '✓' },
    { label: 'Content Upload', value: '✓' },
    { label: 'Plugins/extensions Installation', value: 10 },
  ];

  const reviewStats: ReviewStat[] = [
    { label: 'Seller communication level', rating: 5.0 },
    { label: 'Quality of delivery', rating: 5.0 },
    { label: 'Value of delivery', rating: 5.0 },
  ];

  const relatedGigs: RelatedGig[] = [
    {
      id: 1,
      title: 'I will setup profitable shopify store or dropshipping website',
      price: '1,300,000',
      rating: 5.0,
      reviews: 50,
    },
    {
      id: 2,
      title: 'Our agency will design a high converting ecommerce store',
      price: '1,900,000',
      rating: 4.8,
      reviews: 35,
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      user: {
        name: 'Zaki Hutagulung',
        country: 'Indonesia',
      },
      comment: 'Mantappp!!!',
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backIcon} 
        onPress={handleBack}
      >
        <Text style={styles.backIconText}>←</Text>
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Image 
          source={require('../../../assets/category/1.png')}
          style={styles.headerImage}
        />
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/category/2.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Ikhlas Abdillah Sinaga</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>5.0</Text>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.reviews}>(489)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>
          Design a responsive wordpress website in 24 hours
        </Text>

        <View style={styles.priceContainer}>
          {['1,000,000', '700,000', '500,000'].map((price, index) => (
            <TouchableOpacity 
              key={price}
              style={[styles.priceOption, index === 0 && styles.selectedPrice]}
            >
              <Text style={[styles.priceText, index === 0 && styles.selectedPriceText]}>
                IDR {price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>FUNCTIONAL ECOMMERCE STORE</Text>
          <Text style={styles.description}>
            Fully Functional Ecommerce Website Design Up to 10 Products and Payment Integration
          </Text>
        </View>

        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureLabel}>{feature.label}</Text>
            <Text style={styles.featureValue}>{feature.value}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.expressDelivery}>
          <Text style={styles.expressText}>Express delivery in 5 days</Text>
          <Text style={styles.expressPrice}>+IDR.200,000</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => navigation.navigate('PaymentScreen')} 
        >
          <Text style={styles.continueText}>Continue IDR 1,000,000</Text>
        </TouchableOpacity>

        <View style={styles.portfolioSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My portfolio</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.portfolioContainer}>
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  source={require('../../../assets/category/3.png')}
                  style={styles.portfolioImage}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>2024 reviews</Text>
          {reviewStats.map((stat, index) => (
            <View key={index} style={styles.reviewStatRow}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.statRating}>{stat.rating}</Text>
                <Text style={styles.ratingStar}>★</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.reviewsContainer}>
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <Image 
                source={require('../../../assets/category/7.png')}
                style={styles.reviewerImage} 
              />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{review.user.name}</Text>
                <Text style={styles.reviewerCountry}>{review.user.country}</Text>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>People also viewed</Text>
          {relatedGigs.map(gig => (
            <TouchableOpacity key={gig.id} style={styles.relatedGig}>
              <Image 
                source={require('../../../assets/category/5.png')}
                style={styles.relatedImage} 
              />
              <View style={styles.relatedContent}>
                <Text style={styles.relatedGigTitle} numberOfLines={2}>{gig.title}</Text>
                <View style={styles.relatedRating}>
                  <Text style={styles.ratingNumber}>{gig.rating}</Text>
                  <Text style={styles.ratingStars}>★★★★★</Text>
                  <Text style={styles.reviewCount}>({gig.reviews})</Text>
                </View>
                <Text style={styles.relatedPrice}>IDR {gig.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 24,
    color: '#4A90E2',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 6,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginRight: 4,
  },
  stars: {
    color: '#FFD700',
  },
  reviews: {
    marginLeft: 4,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  priceOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedPrice: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  priceText: {
    color: 'black',
  },
  selectedPriceText: {
    color: 'white',
  },
  descriptionBox: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  featureLabel: {
    color: '#333',
  },
  featureValue: {
    color: '#666',
  },
  expressDelivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginVertical: 16,
  },
  expressText: {
    color: '#333',
  },
  expressPrice: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  portfolioSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    color: '#4A90E2',
  },
  portfolioContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  portfolioImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  reviewsSection: {
    padding: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  reviewStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: '#666',
  },
  statRating: {
    fontWeight: '600',
    marginRight: 4,
  },
  ratingStar: {
    color: '#FFD700',
  },
  reviewsContainer: {
    padding: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  reviewerCountry: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  reviewText: {
    color: '#333',
  },
  relatedSection: {
    padding: 16,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  relatedGig: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  relatedImage: {
    width: 80,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  relatedContent: {
    flex: 1,
  },
  relatedGigTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingNumber: {
    marginRight: 4,
  },
  ratingStars: {
    color: '#FFD700',
    marginRight: 4,
  },
  reviewCount: {
    color: '#666',
    fontSize: 12,
  },
  relatedPrice: {
    fontWeight: '600',
  },
});

export default CategoryDetailScreen;