import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';

interface PaymentDetailProps {
  navigation: any;
  route: any;
}

interface OrderDetails {
  username: string;
  orderId: string;
  quantity: number;
  price: number;
  adminFee: number;
  paymentMethod: string;
}

const CircularProgress = () => (
  <Svg width="60" height="60" viewBox="0 0 60 60">
    <Circle
      cx="30"
      cy="30"
      r="25"
      stroke="#374151"
      strokeWidth="6"
      fill="none"
    />
    <Path
      d="M30 5 A25 25 0 0 1 55 30"
      stroke="#4E6FE3"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

const PaymentDetailScreen: React.FC<PaymentDetailProps> = ({ navigation, route }) => {
  const orderDetails: OrderDetails = {
    username: "Muhammad Revi",
    orderId: "223510431",
    quantity: 2,
    price: route.params?.totalAmount ?? 0,
    adminFee: 3000,
    paymentMethod: route.params?.paymentMethod?.name ?? "QRIS Payment"
  };

  const totalAmount = orderDetails.price + orderDetails.adminFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail pesanan</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.confirmationText}>
          Mohon konfirmasi Id dan Username
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Username:</Text>
            <Text style={styles.detailValue}>{orderDetails.username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Id:</Text>
            <Text style={styles.detailValue}>{orderDetails.orderId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jumlah:</Text>
            <Text style={styles.detailValue}>{orderDetails.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Harga:</Text>
            <Text style={styles.detailValue}>
              IDR. {orderDetails.price.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Biaya Admin:</Text>
            <Text style={styles.detailValue}>
              IDR. {orderDetails.adminFee.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bayar dengan:</Text>
            <Text style={styles.detailValue}>{orderDetails.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalAmount}>
            Rp. {totalAmount.toLocaleString()}
          </Text>
          <View style={styles.progressIndicator}>
            <CircularProgress />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Batalkan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => navigation.navigate('PaymentTotalScreen')}
          >
            <Text style={styles.confirmButtonText}>Konfirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    color: '#00000',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  confirmationText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    color: 'balck',
    fontSize: 16,
  },
  detailValue: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  totalContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  totalLabel: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  totalAmount: {
    color: '#00000',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressIndicator: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#7A92E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4E6FE3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentDetailScreen;