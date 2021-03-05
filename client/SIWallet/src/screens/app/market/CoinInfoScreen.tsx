import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import BalanceInfoCard from '../../../components/profileScreen/BalanceInfoCard';
import InfoCard from '../../../components/profileScreen/InfoCard';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';
import {useSelector} from 'react-redux';
import * as WalletAPI from '../../../API/WalletAPI';

import {CoinInfoScreenProps} from './types/routing';

const CoinInfoScreen: React.FC<CoinInfoScreenProps> = (props) => {
  const {token} = useSelector((state) => state.auth);
  const {coin} = props.route.params;
  const [currency, setCurrency] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();

  const loadCoinInfo = useCallback(async (token, coin) => {
    let result;
    setIsLoading(true);
    setLoadingError(undefined);

    try {
      result = await WalletAPI.getCoinInfo(token, coin.slug);
      if (result.statusCode === 401) {
        Global.resetNavigationStack(props.navigation, 'Auth');
      }
      if (result.statusCode === 200) {
        setCurrency(result.data.data);
      } else {
        Global.errorHandler(result);
      }
    } catch (err) {
      setLoadingError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCoinInfo(token, coin);
  }, [coin]);

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading coin info, try again"
        onErrorPress={() => {
          loadCoinInfo(token, coin);
        }}
      />
    );
  } else if (isLoading || !currency) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <BalanceInfoCard
          dayChangePercent={currency?.market_data.percent_change_usd_last_24_hours.toFixed(
            2,
          )}
          dayChange={(
            currency?.market_data.ohlcv_last_24_hour.close -
            currency?.market_data.ohlcv_last_24_hour.open
          ).toFixed(2)}
          balance={'$' + currency?.market_data.price_usd.toFixed(2)}
          cardStyle={{marginTop: 20, marginBottom: 24, height: 120}}
          firstTitle="PRICE"
          secondTitle="24H CHANGE"
        />
        <InfoCard
          contentList={[
            {
              title: 'All time high',
              value: '$' + currency?.all_time_high.price.toFixed(2),
            },
            {
              title: 'All time high date',
              value: currency?.all_time_high.at,
            },
            {
              title: 'Volume',
              value:
                '$' + currency?.market_data.volume_last_24_hours.toFixed(2),
            },
            {
              title: 'Symbol',
              value: currency?.symbol,
            },
            {
              title: 'Name',
              value: currency?.name,
            },
            {
              title: 'Day high',
              value: currency?.market_data.ohlcv_last_24_hour.high.toFixed(2),
            },
          ]}
          title="Coin Info"
          cardStyle={{marginBottom: 24, height: 244}}
        />
      </View>
    );
  }
};

export const screenOptions = (navData: CoinInfoScreenProps) => {
  const title = navData.route.params.title;
  return {
    headerTitle: title,
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginLeft: 14,
  },
});

export default CoinInfoScreen;
