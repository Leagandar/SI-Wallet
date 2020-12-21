import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import CurrencyListWallet from '../../../components/profileScreen/CurrencyListWallet';
import CurrencyCard from '../../../components/profileScreen/CurrencyCard';
import {useSelector, useDispatch} from 'react-redux';

const CoinsScreen = (props) => {
  let {wallet} = useSelector((state) => state.auth);
  const type = props.route.params.type;
  console.log(type);

  const renderCurrencyCard = ({item, index}) => {
    return (
      <CurrencyCard
        currency={item}
        isActive={true}
        isLast={index === wallet.length - 1 ? true : false}
        onCurrencyPress={() => {
          props.navigation.navigate('Transactions', {
            currency: item,
            type: type,
          });
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground, paddingVertical: 20}}>
      <CurrencyListWallet
        currencies={wallet}
        renderCurrencyItem={renderCurrencyCard}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  let type = navData.route.params.type;
  return {
    headerTitle: type ? 'Send' : 'Receive',
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

const styles = StyleSheet.create({
  optionalText: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#72757C',
    marginBottom: 15,
  },
  adressTitle: {
    fontSize: 32,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 15,
  },
  adressText: {
    fontSize: 14,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: '#72757C',
  },
});

export default CoinsScreen;
