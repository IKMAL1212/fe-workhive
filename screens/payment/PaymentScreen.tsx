import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  Modal
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface PaymentScreenProps {
  navigation: any;
  route: any;
}

interface PaymentMethod {
  id: string;
  name: string;
  logo: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const eWallets = [
    { id: 'dana', name: 'DANA', logo: require('../../../assets/logo/dana.png') },
    { id: 'shopeepay', name: 'ShopeePay', logo: require('../../../assets/logo/shopeepay.png') },
    { id: 'gopay', name: 'GoPay', logo: require('../../../assets/logo/gopay.png') },
    { id: 'ovo', name: 'OVO', logo: require('../../../assets/logo/ovo.png') },
    { id: 'qris', name: 'QRIS', logo: require('../../../assets/logo/qris.png') },
    { id: 'linkaja', name: 'LinkAja', logo: require('../../../assets/logo/linkaja.png') }
  ];

  const banks = [
    { id: 'paypal', name: 'PayPal', logo: require('../../../assets/logo/paypal.png') },
    { id: 'visa', name: 'VISA', logo: require('../../../assets/logo/visa.png') },
    { id: 'crypto', name: 'Crypto', logo: require('../../../assets/logo/crypto.png') },
    { id: 'qris2', name: 'QRIS', logo: require('../../../assets/logo/qris.png') },
    { id: 'bri', name: 'BRI', logo: require('../../../assets/logo/bri.png') },
    { id: 'bni', name: 'BNI', logo: require('../../../assets/logo/bni.png') }
  ];

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setModalVisible(true);
  };

  const handlePayment = () => {
    setModalVisible(false);
    navigation.navigate('PaymentDetailScreen', {
      paymentMethod: selectedPayment,
      totalAmount: route.params?.totalAmount
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E-Wallet</Text>
          <View style={styles.paymentGrid}>
            {eWallets.map((wallet) => (
              <TouchableOpacity
                key={wallet.id}
                style={styles.paymentOption}
                onPress={() => handlePaymentSelect(wallet)}
              >
                <View style={styles.paymentCard}>
                  <Image
                    source={wallet.logo}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bank</Text>
          <View style={styles.paymentGrid}>
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank.id}
                style={styles.paymentOption}
                onPress={() => handlePaymentSelect(bank)}
              >
                <View style={styles.paymentCard}>
                  <Image
                    source={bank.logo}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {selectedPayment && (
              <View style={styles.modalBody}>
                <Image 
                  source={selectedPayment.logo}
                  style={styles.modalLogo}
                  resizeMode="contain"
                />
                <Text style={styles.paymentName}>{selectedPayment.name}</Text>
                <Text style={styles.paymentInstructions}>
                  Please complete your payment using {selectedPayment.name}
                </Text>
                <Text style={styles.amountText}>Total Amount</Text>
                <Text style={styles.amount}>
                  IDR. {route.params?.totalAmount?.toLocaleString() ?? '0'}
                </Text>

                <TouchableOpacity 
                  style={styles.payButton}
                  onPress={handlePayment}
                >
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B7EF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5B7EF4',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: (Dimensions.get('window').width - 60) / 3,
    marginBottom: 15,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentLogo: {
    width: '80%',
    height: '80%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  modalBody: {
    alignItems: 'center',
    padding: 16,
  },
  modalLogo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  paymentName: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  paymentInstructions: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  amountText: {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 8,
  },
  amount: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: '#5B7EF4',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;