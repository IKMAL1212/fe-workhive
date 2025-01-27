import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
 CategoryDetailScreen: undefined;
};

type Props = {
 navigation: NativeStackNavigationProp<RootStackParamList>;
};

interface Template {
 id: number;
 title: string;
 price: number;
 rating: number;
 likes: number;
 image: any;
 author: string;
}

const CategoryAppScreen = ({ navigation }: Props) => {
 const templates: Template[] = [
  {
    id: 1,
    title: "Coffee Shop Website Template",
    price: 1000000,
    rating: 5,
    likes: 30,
    image: require("../../../assets/category/1.png"),
    author: "Alex Johnson"
  },
  {
   id: 2,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 30,
   image: require("../../../assets/category/explor.png"),
   author: "Alex Johnson"
 },
 {
   id: 3,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 30,
   image: require("../../../assets/category/nig.png"),
   author: "Alex Johnson"
 },
 {
   id: 4,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 30,
   image: require("../../../assets/category/land.png"),
   author: "Alex Johnson"
 },
 {
   id: 5,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 30,
   image: require("../../../assets/category/tra.png"),
   author: "Alex Johnson"
 },
 {
   id: 6,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 30,
   image: require("../../../assets/category/art.png"),
   author: "Alex Johnson"
 },
 {
   id: 7,
   title: "Coffee Shop Website Template",
   price: 1000000,
   rating: 5,
   likes: 12,
   image: require("../../../assets/category/coffe.png"),
   author: "Alex Johnson"
 },
];

 const handleMenuPress = () => {
   navigation.navigate('CategoryDetailScreen');
 };

 return (
   <View style={styles.container}>
     <View style={styles.header}>
       <TouchableOpacity 
         style={styles.backButton}
         onPress={() => navigation.goBack()}>
         <Icon name="arrow-back" size={24} />
       </TouchableOpacity>
       <Text style={styles.headerText}>App Design</Text>
       <TouchableOpacity 
         style={styles.menuButton} 
         onPress={handleMenuPress}>
         <Icon name="menu" size={24} />
       </TouchableOpacity>
     </View>

     <ScrollView style={styles.templateList}>
       {templates.map((template) => (
         <View key={template.id} style={styles.templateCard}>
           <View style={styles.imageContainer}>
             <Image 
               source={template.image}
               style={styles.image} 
               resizeMode="cover"
             />
             <TouchableOpacity style={styles.likesButton}>
               <Icon name="heart" size={20} color="red" />
               <Text style={styles.likesText}>{template.likes}K</Text>
             </TouchableOpacity>
           </View>

           <View style={styles.templateInfo}>
             <Text style={styles.title}>{template.title}</Text>
             <Text style={styles.author}>by {template.author}</Text>

             <View style={styles.priceRatingContainer}>
               <Text style={styles.price}>IDR {template.price.toLocaleString()}</Text>
               <View style={styles.ratingContainer}>
                 {[...Array(5)].map((_, i) => (
                   <Icon
                     key={i}
                     name="star"
                     size={16}
                     color={i < template.rating ? "yellow" : "gray"}
                   />
                 ))}
               </View>
             </View>
           </View>
         </View>
       ))}
     </ScrollView>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f9f9f9',
 },
 header: {
   flexDirection: 'row',
   paddingHorizontal: 16,
   paddingVertical: 16,
   backgroundColor: '#EBF3FF',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginTop: 32,
 },
 headerText: {
   fontSize: 16,
   fontWeight: '600',
   flex: 1,
   textAlign: 'center',
 },
 backButton: {
   padding: 12,
   marginVertical: 4,
 },
 menuButton: {
   padding: 12,
   marginVertical: 4,
 },
 templateList: {
   padding: 16,
 },
 templateCard: {
   backgroundColor: 'white',
   borderRadius: 12,
   overflow: 'hidden',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 6,
   marginBottom: 16,
 },
 imageContainer: {
   position: 'relative',
 },
 image: {
   width: '100%',
   height: 200,
 },
 likesButton: {
   position: 'absolute',
   top: 10,
   right: 10,
   backgroundColor: 'white',
   padding: 8,
   borderRadius: 50,
   flexDirection: 'row',
   alignItems: 'center',
 },
 likesText: {
   fontSize: 12,
   marginLeft: 4,
 },
 templateInfo: {
   padding: 16,
 },
 title: {
   fontSize: 16,
   fontWeight: '500',
 },
 author: {
   fontSize: 12,
   color: '#777',
   marginTop: 4,
 },
 priceRatingContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginTop: 8,
 },
 price: {
   fontWeight: '600',
 },
 ratingContainer: {
   flexDirection: 'row',
 },
});

export default CategoryAppScreen;