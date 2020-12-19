import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import BalanceInfoCard from '../../../components/profileScreen/BalanceInfoCard';
import CurrencyList from '../../../components/profileScreen/CurrencyList';

const WalletScreen = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <BalanceInfoCard
        onSendPress={() => {}}
        onReceivePress={() => {}}
        dayChangePercent="+8.1"
        dayChange="243"
        balance="12.679,13"
        cardStyle={{marginTop: 20, marginBottom: 24}}
      />
      <CurrencyList
        currencies={[
          {
            title: 'Bitcoin',
            image: require('../../../assets/images/profileScreen/bitcoin.png'),
            profit: '3.67',
            adress: '0x7e9ba0...6073bf',
            amount: '0,9734',
            price: '12.145,54',
          },
          {
            title: 'Tron',
            image: require('../../../assets/images/profileScreen/tron.png'),
            profit: '2.11',
            adress: '0x7e9ba0...6073bf',
            amount: '230.9',
            price: '23.524',
          },
          {
            title: 'Ripple',
            image: require('../../../assets/images/profileScreen/ripple.png'),
            profit: '-5.67',
            adress: '0x7e9ba0...6073bf',
            amount: '13.95',
            price: '117.54',
          },
          {
            title: 'Bitcoin',
            image: require('../../../assets/images/profileScreen/bitcoin.png'),
            profit: '3.67',
            adress: '0x7e9ba0...6073bf',
            amount: '0,9734',
            price: '12.145,54',
          },
          {
            title: 'Tron',
            image: require('../../../assets/images/profileScreen/tron.png'),
            profit: '2.11',
            adress: '0x7e9ba0...6073bf',
            amount: '230.9',
            price: '23.524',
          },
          {
            title: 'Ripple',
            image: require('../../../assets/images/profileScreen/ripple.png'),
            profit: '-5.67',
            adress: '0x7e9ba0...6073bf',
            amount: '13.95',
            price: '117.54',
          },
        ]}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Wallet',
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

export default WalletScreen;
