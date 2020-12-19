import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import TabNavigator, {screenOptions as tabScreenOptions} from './TabNavigator';
import ProfileNavigator from './ProfileNavigator';
import DiscoveryNavigator from './DiscoveryNavigator';
import MarketNavigator from './MarketNavigator';
import BotsNavigator from './BotsNavigator';
import AuthNavigator from '../auth/AuthNavigator';
import Colors from '../../constants/Colors';
import StartupScreen from '../../screens/StartupScreen';

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

const WalletNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="TabNavigator">
      {/* <MyStackNavigator.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{headerShown: false}}
      /> */}
      <MyStackNavigator.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={tabScreenOptions}
      />
      <MyStackNavigator.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="DiscoveryNavigator"
        component={DiscoveryNavigator}
        options={{}}
      />
      <MyStackNavigator.Screen
        name="MarketNavigator"
        component={MarketNavigator}
        options={{}}
      />
      <MyStackNavigator.Screen
        name="BotsNavigator"
        component={BotsNavigator}
        options={{}}
      />
      <MyStackNavigator.Screen
        name="Auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </MyStackNavigator.Navigator>
  );
};

export default WalletNavigator;
