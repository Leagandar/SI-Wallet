import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import LoadingScreen from '../../../components/LoadingScreen';
import ContentList from '../../../components/ContentList';
import ErrorScreen from '../../../components/ErrorScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as WalletAPI from '../../../API/WalletAPI';
import CoinCard from '../../../components/marketScreen/CoinCard';
import CurrencyList from '../../../components/profileScreen/CurrencyList';
import CurrencyPairCard from '../../../components/marketScreen/CurrencyPairCard';

import {MarketScreenProps} from './types/routing';

const MarketScreen: React.FC<MarketScreenProps> = (props) => {
  const {userId, token} = useSelector((state) => state.auth);
  const [contentCards, setContentCards] = useState();
  const [coins, setCoins] = useState([]);
  const [coinsLoading, setCoinsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(undefined);
  const dispatch = useDispatch();
  let CardsContent = View;

  const getCoins = useCallback(
    async (token) => {
      console.log('GET COINS\n\n');
      setCoinsLoading(true);
      setLoadingError(undefined);
      try {
        let result = await WalletAPI.getCoins(token);
        if (result.statusCode === 200) {
          // console.log(result);

          setCoins(result.data);
          setContentCards(result.data);
          //console.log(result.data);
        } else {
          console.log(result);
          const errorId = result.data.errors?.[0];
          let message = Global.getErrorMessage(
            errorId,
            'MarketScreen/getCoins',
            false,
          );
          throw new Error(message);
        }
      } catch (err) {
        setLoadingError(err.message);
        console.log('loading news ->> ' + err.message);
      }
      setCoinsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    getCoins(token);
  }, []);

  if (!userId && !token) {
    CardsContent = ErrorScreen;
  } else {
    CardsContent = ContentList;
    if (loadingError) {
      CardsContent = ErrorScreen;
    } else if (coinsLoading) {
      CardsContent = LoadingScreen;
    }
  }

  const renderCoinCard = ({item, index}) => {
    return (
      <CoinCard
        currency={item}
        isActive={true}
        isLast={index === contentCards.length - 1 ? true : false}
        onCurrencyPress={() => {
          props.navigation.navigate('MarketNavigator', {
            screen: 'CoinInfo',
            params: {
              coin: item,
              title: item.symbol,
            },
          });
        }}
      />
    );
  };

  const renderPairCard = ({item, index}) => {
    return <CurrencyPairCard item={item} />;
  };

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading coins, try again"
        onErrorPress={() => {
          getCoins(token);
        }}
      />
    );
  } else if (coinsLoading || !contentCards) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.screen}>
        <CurrencyList
          currencies={contentCards?.assets?.data}
          renderCurrencyItem={renderCoinCard}
          isMarket={true}
          header={() => (
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.listStyle}
                data={contentCards?.pairs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPairCard}
                horizontal={true}
              />
            </View>
          )}
        />
      </View>
    );
  }
};

export const screenOptions = {
  headerTitle: 'Market',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingTop: 20,
  },
  listStyle: {
    paddingHorizontal: 12,
  },
});

export default MarketScreen;
