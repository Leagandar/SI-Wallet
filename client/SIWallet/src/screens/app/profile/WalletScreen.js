import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import BalanceInfoCard from '../../../components/profileScreen/BalanceInfoCard';
import CurrencyList from '../../../components/profileScreen/CurrencyList';
import * as WalletAPI from '../../../API/WalletAPI';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../../store/actions/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';

const WalletScreen = (props) => {
  let {token, userId, wallet} = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const dispatch = useDispatch();

  const loadWalletInfo = useCallback(async (token) => {
    let result;
    setIsLoading(true);
    setLoadingError(undefined);

    try {
      result = await WalletAPI.getWalletInfo(token);
      if (result.statusCode === 200) {
        dispatch(authActions.setWalletInfo(result.data));
      } else {
        console.log(result);
        const errorId = result.data.errors?.[0];
        let message = Global.getErrorMessage(
          errorId,
          'ProfileScreen/getUserInfo',
          false,
        );
        throw new Error(message);
      }
    } catch (err) {
      setLoadingError(err.message);
      console.log('error while getting user info -->' + err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadWalletInfo(token);
  }, [userId, token]);

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading wallet info, try again"
        onErrorPress={() => {
          loadUserinfo(token);
        }}
      />
    );
  } else if (isLoading || !wallet) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <BalanceInfoCard
          onSendPress={() => {}}
          onReceivePress={() => {}}
          dayChangePercent="+8.1"
          dayChange="243"
          balance="12.679,13"
          cardStyle={{marginTop: 20, marginBottom: 24}}
          onSendPress={() => {
            props.navigation.navigate('Coins', {
              wallet: wallet,
              type: 'send',
            });
          }}
          onReceivePress={() => {
            props.navigation.navigate('Coins', {
              wallet: wallet,
              type: 'receive',
            });
          }}
        />
        <CurrencyList currencies={wallet} />
      </View>
    );
  }
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
