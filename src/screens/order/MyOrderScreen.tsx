import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MyOrderScreen = () => {
  const navigation = useNavigation();
  const orderStatus = [
    { title: 'Unpaid', count: 0 },
    { title: 'Processing', count: 1, active: true },
    { title: 'Completed', count: 0 },
    { title: 'Cancelled', count: 0 },
    { title: 'Failed', count: 0 }
  ];

  const recommendedItems = [
    {
      id: 1,
      title: 'Design App',
      description: 'Special Promo cheapest website design, click here..',
      price: 'IDR. 800.000',
      rating: 4,
      reviews: 4756,
      image: require('../../../assets/category/10.png'),
    },
    {
      id: 2,
      title: 'Design App',
      description: 'Special Promo cheapest website design, click here..',
      price: 'IDR. 800.000',
      rating: 4,
      reviews: 4756,
      image: require('../../../assets/category/11.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Order</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statusContainer}
      >
        {orderStatus.map((status, index) => (
          <View 
            key={index}
            style={[
              styles.statusBox,
              status.active && styles.activeStatusBox
            ]}
          >
            <Text style={[
              styles.statusTitle,
              status.active && styles.activeStatusTitle
            ]}>
              {status.title}
            </Text>
            <Text style={[
              styles.statusCount,
              status.active && styles.activeStatusTitle
            ]}>
              {status.count}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.orderCard}>
        <Image 
          source={require('../../../assets/category/1.png')}
          style={styles.orderImage}
        />
        <View style={styles.orderDetails}>
          <Text style={styles.orderTitle}>Design Responsive Website</Text>
          <Text style={styles.orderPrice}>IDR. 1.000.000</Text>
          <Text style={styles.orderDate}>Order, 14 Des, 2024</Text>
          <Text style={styles.orderEstimation}>
            Estimation Complete 25 Des-28Des
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Chat Seller</Text>
      </TouchableOpacity>

      <View style={styles.recommendedSection}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Maybe you like it</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedList}
        >
          {recommendedItems.map((item) => (
            <View key={item.id} style={styles.recommendedCard}>
              <Image source={item.image} style={styles.recommendedImage} />
              <View style={styles.recommendedDetails}>
                <Text style={styles.recommendedItemTitle}>{item.title}</Text>
                <Text style={styles.recommendedDescription}>
                  {item.description}
                </Text>
                <Text style={styles.recommendedPrice}>{item.price}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Text key={index} style={styles.starIcon}>
                      {index < item.rating ? '★' : '☆'}
                    </Text>
                  ))}
                  <Text style={styles.reviewCount}>{item.reviews}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 38,
    marginLeft: -29,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom: 4,
  },
  statusContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statusBox: {
    minWidth: 100,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeStatusBox: {
    backgroundColor: '#4169E1',
  },
  statusTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  activeStatusTitle: {
    color: '#fff',
  },
  statusCount: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  orderCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  orderDetails: {
    marginLeft: 16,
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#4169E1',
    marginTop: 4,
  },
  orderEstimation: {
    fontSize: 14,
    color: '#4169E1',
    marginTop: 2,
  },
  chatButton: {
    backgroundColor: '#4169E1',
    padding: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendedSection: {
    padding: 16,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllButton: {
    color: '#4169E1',
    fontSize: 14,
  },
  recommendedList: {
    flexDirection: 'row',
  },
  recommendedCard: {
    width: 250,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendedImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  recommendedDetails: {
    padding: 12,
  },
  recommendedItemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  recommendedDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recommendedPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 16,
  },
  reviewCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
});

export default MyOrderScreen;