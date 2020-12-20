import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import * as WalletAPI from '../../../API/WalletAPI';
import {useSelector, useDispatch} from 'react-redux';
import Clipboard from '@react-native-community/clipboard';

const TransactionScreen = (props) => {
  let {token, userId} = useSelector((state) => state.auth);
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionError, setTransactionError] = useState(undefined);
  const dispatch = useDispatch();
  let type = props.route.params.type;
  let currency = props.route.params.currency;
  console.log(currency);

  const sendTransactionHandler = async (token, amount, address, currency) => {
    setTransactionError(undefined);
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      let result = await WalletAPI.sendTransaction(
        token,
        amount,
        address,
        currency.curency.toLowerCase(),
        currency.balances[0].address,
      );
      if (result.statusCode === 200) {
        console.log(result);
      } else {
        console.log(result);
        const errorId = result.data.message?.[0];
        let message = Global.getErrorMessage(
          errorId,
          'SignUpScreen/signup',
          false,
        );
        throw new Error(message);
      }
    } catch (err) {
      setTransactionError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (transactionError) {
      Alert.alert('Error occured', transactionError, [{text: 'OK'}]);
    }
  }, [transactionError]);

  if (type === 'send') {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.blackBackground,
            paddingHorizontal: 17,
            paddingVertical: 20,
          }}>
          <DefaultTextInput
            onChangeText={(text) => {
              setAddress(text);
            }}
            value={address}
            placeholder="RECIPIENT ADRESS"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
          />
          <DefaultTextInput
            onChangeText={(text) => {
              setAmount(text);
            }}
            value={amount}
            placeholder="AMOUNT"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
            inputStyle={{marginBottom: 40}}
            keyboardType="numeric"
          />
          <Text style={styles.optionalText}>Optional</Text>
          <DefaultTextInput
            onChangeText={(text) => {
              setMemo(text);
            }}
            value={memo}
            placeholder="MEMO"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
          />
          <ButtonComponent
            title="SEND"
            buttonContainerStyle={{padding: 0}}
            onPress={() => {
              sendTransactionHandler(token, amount, address, currency);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.blackBackground,
          alignItems: 'center',
        }}>
        <Text style={styles.adressTitle}>ADRESS:</Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(currency.balances[0].address);
          }}>
          <Text style={styles.adressText}>{currency.balances[0].address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 15,
  },
  adressText: {
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: '#72757C',
    
  },
});

export default TransactionScreen;
