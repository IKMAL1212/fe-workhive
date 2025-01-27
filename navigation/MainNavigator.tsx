import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import BottomNavigator from './BottomNavigator';
import ActivateAccountScreen from "../screens/ActivateAccountScreen";
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import CommunityChannelScreen from '../screens/Community/CommunityChannelScreen';
import CommunityDetailScreen from '../screens/Community/CommunityDetailScreen';
import ChatCommunityScreen from '../screens/Community/ChatCommunityScreen';
import CommunityProfileScreen from '../screens/Community/CommunityProfileScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import DiscoverChannelScreen from '../screens/Discover/DiscoverChannelScreen';
import SearchScreen from '../screens/search/SearchScreen';
import CategoryScreen from '../screens/category/CategoryScreen';
import { RootStackParamList } from "../types/navigation";
import CategoryChannelScreen from '../screens/category/CategoryChannelScreen';
import CategoryDetailScreen from '../screens/category/CategoryDetailScreen';
import CategoryAppScreen from '../screens/category/CategoryAppScreen';
import PaymentCompleteScreen from '../screens/payment/PaymentCompleteScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import PaymentDetailScreen from '../screens/payment/PaymentDetailScreen';
import PaymentTotalScreen from '../screens/payment/PaymentTotalScreen';
import MyOrderScreen from '../screens/order/MyOrderScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';
import RatingScreen from '../screens/chat/RatingScreen';


const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <AuthProvider>
      <UserProvider>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          {/* Auth Screens */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ActivateAccountScreen"
            component={ActivateAccountScreen}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="EnterOtp" component={OTPScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="RegisterOTP" component={RegisterScreen} />

          {/* Main App Screens */}
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="CommunityChannelScreen"
            component={CommunityChannelScreen}
          />
          <Stack.Screen
            name="CommunityDetailScreen"
            component={CommunityDetailScreen}
          />
          <Stack.Screen
            name="ChatCommunityScreen"
            component={ChatCommunityScreen}
          />
          <Stack.Screen
            name="CommunityProfileScreen"
            component={CommunityProfileScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="CategoryChannelScreen" component={CategoryChannelScreen} />
          <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
          <Stack.Screen name="CategoryAppScreen" component={CategoryAppScreen} />
          <Stack.Screen name="PaymentCompleteScreen" component={PaymentCompleteScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="PaymentDetailScreen" component={PaymentDetailScreen} />
          <Stack.Screen name="PaymentTotalScreen" component={PaymentTotalScreen} />
          <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
          <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
          <Stack.Screen name="DiscoverChannelScreen" component={DiscoverChannelScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
          <Stack.Screen name="RatingScreen" component={RatingScreen} />

          <Stack.Screen name="Main" component={BottomNavigator} />
        </Stack.Navigator>
      </UserProvider>
    </AuthProvider>
  );
}