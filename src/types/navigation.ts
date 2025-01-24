export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ActivateAccountScreen: {
    activationToken: string;
  };
  ForgotPassword: undefined;
  EnterOtp: {
    email: string;
    passwordResetToken: string;
  };
  NewPassword: {
    email: string;
    otp: string;
  };
  RegisterOTP: undefined;
  Main: undefined;
  EditProfileScreen: undefined;
  ChangePasswordScreen: undefined;
  CommunityChannelScreen: undefined;
  CommunityDetailScreen: undefined;
  ChatCommunityScreen: undefined;
  CommunityProfileScreen: undefined;
  DiscoverChannelScreen: undefined;
  SearchScreen: undefined;
  CategoryScreen: undefined;
  CategoryChannelScreen: undefined;
  CategoryDetailScreen: undefined;
  CategoryAppScreen: undefined;
  PaymentCompleteScreen: undefined;
  PaymentDetailScreen: undefined;
  PaymentScreen: undefined;
  PaymentTotalScreen: undefined;
  MyOrderScreen: undefined;
  DiscoverScreen: undefined;
  ChatScreen: undefined;
  ChatDetailScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Discover: undefined;
  Chat: undefined;
  Profile: undefined;
};