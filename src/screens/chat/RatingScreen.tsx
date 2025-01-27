import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

const profileImage = require('../../../assets/chat/1.png');
const serviceImage = require('../../../assets/chat/1.png');

type RatingScreenProps = {
  navigation: StackNavigationProp<any>;
};

const RatingScreen: React.FC<RatingScreenProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      
      Keyboard.dismiss();
      
      setIsSubmitted(true);
      setTimeout(() => {
        navigation.navigate('ChatDetailScreen');
      }, 1500);
    }
  };

  const StarSVG: React.FC<{ filled: boolean }> = ({ filled }) => (
    <View>
      <Text style={{ color: filled ? '#FBBF24' : '#D1D5DB', fontSize: 32 }}>★</Text>
    </View>
  );

  if (!isOpen) return null;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Chat Background */}
        <View style={styles.chatBackground}>
          <View style={styles.chatHeader}>
            <Image
              source={profileImage} 
              style={styles.profileImage}
            />
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatHeaderTextTitle}>Ikhlas Abdillah Sinaga</Text>
            </View>
          </View>

          <View style={styles.messagesContainer}>
            <View style={styles.messageContainer}>
              <View style={styles.doctorMessageBubble}>
                <Text style={styles.doctorMessageText}>
                  Thank you for waiting Revi! Is there any problem with the template you purchased?
                </Text>
              </View>
              <Text style={styles.messageTime}>16:30</Text>
            </View>

            <View style={styles.messageContainer}>
              <View style={styles.userMessageBubble}>
                <Text style={styles.userMessageText}>
                  No, this template is so amazing, I came to rate you
                </Text>
              </View>
              <Text style={styles.messageTime}>16:30</Text>
            </View>
          </View>
        </View>

        {/* Rating Modal */}
        <View style={styles.ratingModal}>
          <View style={styles.modalContent}>
            {isSubmitted ? (
              <View style={styles.successMessage}>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>✓</Text>
                </View>
                <Text style={styles.successText}>Rate done successfully.</Text>
              </View>
            ) : (
              <View style={styles.ratingForm}>
                <Text style={styles.ratingTitle}>Rate Our Service</Text>

                <View style={styles.serviceDetails}>
                  <Image
                    source={serviceImage}  
                    style={styles.serviceImage}
                  />
                  <View>
                    <Text style={styles.serviceName}>Ikhlas Abdillah Sinaga</Text>
                    <Text style={styles.serviceRole}>Customer Care Service</Text>
                  </View>
                </View>

                <View style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      onPressIn={() => setHoveredRating(star)}
                      onPressOut={() => setHoveredRating(0)}
                    >
                      <StarSVG filled={star <= (hoveredRating || rating)} />
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={styles.commentInput}
                  placeholder="Your comment"
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  autoFocus
                />

                <TouchableOpacity
                  style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
                  onPress={handleSubmit}
                  disabled={rating === 0}
                >
                  <Text style={styles.submitButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  chatBackground: {
    paddingLeft: 21,
    paddingTop: 46,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderTextTitle: {
    fontWeight: '600',
  },
  messagesContainer: {
    marginTop: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  doctorMessageBubble: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
  },
  userMessageBubble: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  doctorMessageText: {
    color: '#FFFFFF',
  },
  userMessageText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  ratingModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '90%',
    maxWidth: 400,
    margin: 16,
  },
  successMessage: {
    padding: 32,
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#3B82F6',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successIconText: {
    color: 'white',
    fontSize: 32,
  },
  successText: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: '500',
  },
  ratingForm: {
    padding: 24,
  },
  ratingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  serviceImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3B82F6',
  },
  serviceRole: {
    color: '#6B7280',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  commentInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    height: 128,
    marginBottom: 24,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default RatingScreen;
