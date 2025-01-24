import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface NavigationProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const ChatCommunityScreen = ({ navigation }: NavigationProps) => {
  const messages = [
    { id: 1, text: 'Welcome Revi!', time: '16.30', sender: 'other', color: '#fed7aa' },
    { id: 2, text: 'Welcome a board Revi!', time: '16.33', sender: 'other', color: '#fdba74' },
    { id: 3, text: 'Welcome a board Revi!', time: '16.35', sender: 'other', color: '#fdba74' },
    { id: 4, text: 'Welcome a board Revi!', time: '16.37', sender: 'other', color: '#fdba74' },
    { id: 6, text: 'Welcome a board Revi!', time: '16.38', sender: 'other', color: '#fdba74' },
    { id: 7, text: 'Welcome a board Revi!', time: '16.39', sender: 'other', color: '#fdba74' },
    { id: 8, text: 'Towelcome guys', time: '16.50', sender: 'self', color: '#3b82f6' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CommunityProfileScreen')}>
          <Image 
            source={require('../../../assets/community/programmer.png')}
            style={styles.headerProfileImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Programmer Community</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messageContainer}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageRow,
            message.sender === 'self' ? styles.selfMessageRow : styles.otherMessageRow
          ]}>
            {message.sender === 'other' && (
              <Image 
                source={require('../../../assets/community/f2.png')}
                style={styles.profileImage}
              />
            )}
            
            <View style={[
              styles.messageBubble,
              { backgroundColor: message.color },
              message.sender === 'self' ? styles.selfMessage : styles.otherMessage
            ]}>
              <Text style={message.sender === 'self' ? styles.selfMessageText : styles.messageText}>
                {message.text}
              </Text>
              <Text style={styles.timeText}>{message.time}</Text>
            </View>
            {message.sender === 'self' && (
              <Image 
                source={require('../../../assets/community/f1.png')}
                style={styles.profileImage}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Message"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>➤</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>≡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  backButton: {
    marginRight: 8,
  },
  headerProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },
  messageContainer: {
    flex: 1,
    padding: 16
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  selfMessageRow: {
    justifyContent: 'flex-end'
  },
  otherMessageRow: {
    justifyContent: 'flex-start'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8
  },
  messageBubble: {
    borderRadius: 16,
    padding: 8,
    maxWidth: '70%'
  },
  selfMessage: {
    marginLeft: 8
  },
  otherMessage: {
    marginRight: 8
  },
  messageText: {
    color: '#000'
  },
  selfMessageText: {
    color: '#fff'
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    alignSelf: 'flex-end',
    marginTop: 4
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 16,
    gap: 16
  },
  buttonText: {
    color: '#3b82f6'
  }
});

export default ChatCommunityScreen;