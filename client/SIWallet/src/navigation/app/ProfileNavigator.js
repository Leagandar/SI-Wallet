import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from '../../screens/app/profile/ProfileScreen';
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from '../../screens/app/profile/EditProfileScreen';
import WalletScreen, {
  screenOptions as walletScreenOptions,
} from '../../screens/app/profile/WalletScreen';
import EnterUserInfoScreen, {
  screenOptions as enterUserInfoScreenOptions,
} from '../../screens/app/profile/EnterUserInfoScreen';

const MyStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Colors.black,
  ...TransitionPresets.SlideFromRightIOS,
};

const ProfileNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Profile">
      <MyStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <MyStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
      <MyStackNavigator.Screen
        name="EnterUserInfo"
        component={EnterUserInfoScreen}
        options={enterUserInfoScreenOptions}
      />
      <MyStackNavigator.Screen
        name="Wallet"
        component={WalletScreen}
        options={walletScreenOptions}
      />
    </MyStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
