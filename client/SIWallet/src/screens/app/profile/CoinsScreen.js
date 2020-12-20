import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import CurrencyList from '../../../components/profileScreen/CurrencyList';
import LinearGradient from 'react-native-linear-gradient';

const CoinsScreen = (props) => {
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();
  const wallet = props.route.params.wallet;
  const type = props.route.params.type;
  console.log(type)

  const currencies = wallet.map((currency, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Transactions', {
            currency: currency,
            type: type,
          });
        }}
        id={currency.currency + Math.random()}>
        <View style={styles.menuSection}>
          {/* <Image style={styles.menuItemImage} source={currency.image} /> */}
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.menuItemTitle} numberOfLines={1}>
                {currency.title}
              </Text>
              {/* <Text style={styles.profitTitle}>{currency.profit + '%'}</Text> */}
            </View>
            <Text style={styles.currencyAdress}>
              {currency.balances[0].address}
            </Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View>
              <Text style={styles.currencyAmount}>
                {currency.available_balance}
              </Text>
              <Text style={styles.currencyPrice}>
                {'$' + currency.price_usd}
              </Text>
            </View>
          </View>
        </View>
        {index != wallet.length - 1 && (
          <View style={styles.separator}></View>
        )}
      </TouchableOpacity>
    );
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <LinearGradient
        style={{
          ...styles.card,
          ...props.cardStyle,
        }}
        colors={Colors.cardInfoGradient}>
        <View style={styles.list}>{currencies}</View>
      </LinearGradient>
    </View>
  );
};

export const screenOptions = (navData) => {
  let type = navData.route.params.type;
  return {
    headerTitle: type ? 'send' : 'receive',
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
