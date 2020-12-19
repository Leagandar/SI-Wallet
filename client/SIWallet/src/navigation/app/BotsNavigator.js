import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import BotsScreen, {
  screenOptions as botsScreenOptions,
} from '../../screens/app/bots/BotsScreen';
import CreateBotScreen, {
  screenOptions as createBotScreenOptions,
} from '../../screens/app/bots/CreateBotScreen';
import BotInfoScreen, {
  screenOptions as botInfoScreenOptions,
} from '../../screens/app/bots/BotInfoScreen';

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

const BotsNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Bots">
      <MyStackNavigator.Screen
        name="Bots"
        component={BotsScreen}
        options={botsScreenOptions}
      />
      <MyStackNavigator.Screen
        name="CreateBot"
        component={CreateBotScreen}
        options={createBotScreenOptions}
      />
      <MyStackNavigator.Screen
        name="BotInfo"
        component={BotInfoScreen}
        options={botInfoScreenOptions}
      />
    </MyStackNavigator.Navigator>
  );
};

export default BotsNavigator;
