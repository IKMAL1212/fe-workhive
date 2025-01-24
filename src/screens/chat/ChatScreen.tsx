import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ChatDetailScreen: undefined;
  Home: undefined;
};

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChatDetailScreen'
>;

interface ChatScreenProps {
  navigation: ChatScreenNavigationProp;
}

interface ChatItem {
  id: string;
  name: string;
  message: string;
  profileImage: any;
  unread: boolean;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const chatData: ChatItem[] = [
    {
      id: '1',
      name: 'Ikhlas Abdillah Sinaga',
      message: 'How Much?',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: true,
    },
    {
      id: '2',
      name: 'Zaki Hutagulung',
      message: 'yeaah bro!',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: true,
    },
    {
      id: '3',
      name: 'Ikmal Simbolon',
      message: 'Cancel',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: false,
    },
    {
      id: '4',
      name: 'Azizi Nababan',
      message: 'Up',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: false,
    },
    {
      id: '5',
      name: 'Raihan Situmorang',
      message: 'How iam make it?',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: false,
    },
    {
      id: '6',
      name: 'Adrian Siregar',
      message: 'You’re so cool!',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: false,
    },
    {
      id: '7',
      name: 'Inola Limbong',
      message: 'I agree',
      profileImage: require('../../../assets/logo/logo.png'),
      unread: false,
    },
  ];

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
    onPress={() => navigation.navigate('ChatDetailScreen')}
    >
      <View style={styles.chatContent}>
        <Image source={item.profileImage} style={styles.profileImage} />
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text
            style={[
              styles.chatMessage,
              { color: item.unread ? '#007AFF' : '#666' },
            ]}
          >
            {item.message}
          </Text>
        </View>
      </View>
      {item.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Massage</Text>
      </View>

      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />

      <View style={styles.bottomNavBar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="compass-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="people-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatMessage: {
    fontSize: 14,
    marginTop: 3,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
});

export default ChatScreen;
