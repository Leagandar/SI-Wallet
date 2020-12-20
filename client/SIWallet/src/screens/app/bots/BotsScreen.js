import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';

const BotsScreen = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}></View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Bots',
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
    },
    headerTitleAlign: 'center',
    headerRight: (props) => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate('BotsNavigator', {
            screen: 'CreateBot',
            params: {},
          });
        }}>
        <Image
          source={require('../../../assets/images/addIcon.png')}
          style={{height: 24, width: 24, marginLeft: 14}}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default BotsScreen;
