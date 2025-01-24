import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

interface PaymentTotalScreenProps {
  navigation: any;
  route: any;
}

const PaymentTotalScreen: React.FC<PaymentTotalScreenProps> = ({ navigation, route }) => {
  const { 
    totalAmount = 1153000,
    estimationDays = 10,
  } = route.params || {};

  const referenceNumber = "00008575257";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pembayaran QRIS</Text>
        <Image 
          source={require('../../../assets/logo/qris.png')}
          style={styles.qrisLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Scan QR Code</Text>
          <Text style={styles.adminText}>WorkHive ADMIN</Text>
          <Text style={styles.referenceText}>No Ref : {referenceNumber}</Text>
          
          <Image
            source={require('../../../assets/logo/qris.png')}
            style={styles.qrCode}
            resizeMode="contain"
          />
          
          <Text style={styles.scanText}>Scan or Screenshot QRIS for Payment</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Harga :</Text>
            <Text style={styles.detailValue}>
              IDR. {totalAmount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery days :</Text>
            <Text style={styles.detailValue}>{estimationDays} Days</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.selesaiButton}
            onPress={() => navigation.navigate('PaymentCompleteScreen')}
          >
            <Text style={styles.selesaiButtonText}>Selesai</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.batalButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.batalButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  qrisLogo: {
    width: 60,
    height: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  adminText: {
    fontSize: 16,
    marginBottom: 4,
  },
  referenceText: {
    fontSize: 16,
    marginBottom: 24,
  },
  qrCode: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  scanText: {
    fontSize: 16,
    marginBottom: 32,
  },
  detailsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  selesaiButton: {
    flex: 1,
    backgroundColor: '#4169E1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  selesaiButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  batalButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  batalButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentTotalScreen;