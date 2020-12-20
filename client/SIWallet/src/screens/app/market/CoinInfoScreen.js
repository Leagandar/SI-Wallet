import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';

const CoinInfoScreen = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <Text>CoinInfoScreen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  const title = navData.route.params.title;
  return {
    headerTitle: title,
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
    },
    headerTitleAlign: 'center',
    headerLeft: (props) => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={{height: 24, width: 24, marginLeft: 14}}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default CoinInfoScreen;
