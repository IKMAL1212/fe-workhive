import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface PaymentCompleteScreenProps {
  navigation: any;
}

const PaymentCompleteScreen: React.FC<PaymentCompleteScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.headerTitle}>Pembayaran Berhasil</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ref Number</Text>
            <Text style={styles.detailValue}>00008575257</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Time</Text>
            <Text style={styles.detailValue}>02-12-2024, 09:30:16</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bayar dengan</Text>
            <Text style={styles.detailValue}>QRIS</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nama Pengirim</Text>
            <Text style={styles.detailValue}>Muhammad Revi</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jumlah</Text>
            <Text style={styles.detailValue}>IDR 1.153.000</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.lihatButton}
            onPress={() => navigation.navigate('MyOrderScreen')}
          >
            <Text style={styles.buttonText}>Lihat Pesanan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.kembaliButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.buttonText}>Kembali ke beranda</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginTop: 10,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  lihatButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  kembaliButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentCompleteScreen;