import React, { useState, useRef } from "react";
import {
 StyleSheet,
 View,
 Text,
 SafeAreaView,
 Image,
 TouchableOpacity,
 TextInput,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";

type ChatDetailScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    ChatDetailScreen: undefined;
  }, 'ChatDetailScreen'>;
};

const ChatDetailScreen = ({ navigation, route }: ChatDetailScreenProps) => {
  const [inputMessage, setInputMessage] = useState("");
 const [messages, setMessages] = useState([
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
     message: 'You re so cool!',
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
 ]);
 const scrollViewRef = useRef<ScrollView>(null);

 const sendMessage = () => {
   if (inputMessage.trim().length > 0) {
     const newMessage = {
       id: String(messages.length + 1),
       name: 'You',
       message: inputMessage.trim(),
       profileImage: require('../../../assets/logo/logo.png'),
       unread: false,
     };

     setMessages([...messages, newMessage]);
     setInputMessage("");
     scrollViewRef.current?.scrollToEnd({ animated: true });
   }
 };

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.header}>
       <TouchableOpacity
         style={styles.backButton}
         onPress={() => navigation.goBack()}
       >
         <Ionicons name="chevron-back" size={24} color="#333" />
       </TouchableOpacity>

       <Image
         source={require("../../../assets/logo/logo.png")}
         style={styles.profileImage}
       />
       <Text style={styles.headerTitle}>Ikhlas Abdillah Sinaga</Text>

       <TouchableOpacity style={styles.callButton}>
         <Ionicons name="call" size={24} color="#007AFF" />
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.starButton}
         onPress={() => navigation.navigate("RatingScreen")}
       >
         <Image
           source={require("../../../assets/logo/rating.png")}
           style={styles.starImage}
         />
       </TouchableOpacity>
     </View>

     <ScrollView
       style={styles.chatContainer}
       contentContainerStyle={styles.chatContentContainer}
       ref={scrollViewRef}
     >
       {messages.map((message) => (
         <View key={message.id} style={styles.messageContainer}>
           <Image
             source={message.profileImage}
             style={styles.messageProfileImage}
           />
           <View style={styles.messageContent}>
             <Text style={styles.messageName}>{message.name}</Text>
             <View style={styles.messageBubble}>
               <Text style={styles.messageText}>{message.message}</Text>
             </View>
             {message.unread && (
               <View style={styles.unreadIndicator} />
             )}
           </View>
         </View>
       ))}
     </ScrollView>

     <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.inputContainer}
     >
       <TextInput
         style={styles.input}
         placeholder="Type a message..."
         placeholderTextColor="#8E8E93"
         value={inputMessage}
         onChangeText={setInputMessage}
         onSubmitEditing={sendMessage}
         returnKeyType="send"
       />
       <TouchableOpacity
         style={[
           styles.sendButton,
           inputMessage.trim().length === 0 && styles.sendButtonDisabled,
         ]}
         onPress={sendMessage}
         disabled={inputMessage.trim().length === 0}
       >
         <Ionicons
           name="send"
           size={24}
           color={inputMessage.trim().length === 0 ? "#8E8E93" : "#007AFF"}
         />
       </TouchableOpacity>
     </KeyboardAvoidingView>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#FFFFFF",
 },
 header: {
   flexDirection: "row",  
   alignItems: "center",
   paddingHorizontal: 16,
   paddingVertical: 10,
   borderBottomWidth: 1,
   borderBottomColor: "#E5E5EA",
 },
 backButton: {
   marginRight: 8,
 },
 headerTitle: {
   flex: 1,
   fontSize: 18,
   fontWeight: "600",
   textAlign: "center", 
   color: "#333",
 },
 callButton: {
   marginLeft: 8,
 },
 starButton: {
   marginLeft: 8,
 },
 starImage: {
   width: 37,
   height: 34,
   borderRadius: 0,
 },
 profileImage: {
   width: 40,
   height: 40,
   borderRadius: 20,
   marginRight: 8,  
 },
 chatContainer: {
   flex: 1,
 },
 chatContentContainer: {
   padding: 16,
 },
 messageContainer: {
   flexDirection: "row",
   marginBottom: 16,
   paddingHorizontal: 16,
 },
 messageProfileImage: {
   width: 40,
   height: 40,
   borderRadius: 20,
   marginRight: 12,
 },
 messageContent: {
   flex: 1,
 },
 messageName: {
   fontSize: 14,
   fontWeight: "600",
   marginBottom: 4,
   color: "#333",
 },
 messageBubble: {
   backgroundColor: "#F2F2F7",
   borderRadius: 16,
   padding: 12,
   maxWidth: "90%",  
 },
 messageText: {
   fontSize: 16,
   color: "#000000",
 },
 unreadIndicator: {
   position: "absolute",
   right: 0,
   top: 10,
   width: 8,
   height: 8,
   borderRadius: 4,
   backgroundColor: "#007AFF",
 },
 messageTime: {
   fontSize: 12,
   color: "#8E8E93",
   marginTop: 4,
 },
 inputContainer: {
   flexDirection: "row",
   alignItems: "center",
   paddingHorizontal: 16,
   paddingVertical: 8,
   borderTopWidth: 1,
   borderTopColor: "#E5E5EA",
 },
 input: {
   flex: 1,
   backgroundColor: "#F2F2F7",
   borderRadius: 20,
   paddingHorizontal: 16,
   paddingVertical: 8,
   fontSize: 16,
 },
 sendButton: {
   marginLeft: 8,
   padding: 8,
 },
 sendButtonDisabled: {
   opacity: 0.5,
 },
});

export default ChatDetailScreen;