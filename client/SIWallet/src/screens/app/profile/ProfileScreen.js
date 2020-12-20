import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import InfoCard from '../../../components/profileScreen/InfoCard';
import UserPreviewCard from '../../../components/profileScreen/UserPreviewCard';
import {useSelector, useDispatch} from 'react-redux';
import * as UserAPI from '../../../API/UserAPI';
import {CommonActions} from '@react-navigation/native';
import * as authActions from '../../../store/actions/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';

const ProfileScreen = (props) => {
  let {userId, token, user} = useSelector((state) => state.auth);
  console.log("TOKEN");
  console.log(token);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const dispatch = useDispatch();

  const loadUserinfo = useCallback(async (token) => {
    let result;
    setIsLoading(true);
    setLoadingError(undefined);

    try {
      result = await UserAPI.getUserInfo(token);
      if (result.statusCode === 401) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Auth'}],
          }),
        );
      }
      if (result.statusCode === 200) {
        dispatch(authActions.setUserInfo(result.data));
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
    loadUserinfo(token);
  }, [userId, token]);

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading user info, try again"
        onErrorPress={() => {
          loadUserinfo(token);
        }}
      />
    );
  } else if (isLoading || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <ScrollView style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <UserPreviewCard
          userName={user?.accountInfo.name + ' ' + user?.accountInfo.surname}
          userBalance={user?.balanceInfo.totalBalance}
          cardStyle={{marginTop: 20, marginBottom: 24}}
          onManageProfilePress={() => {
            props.navigation.navigate('ProfileNavigator', {
              screen: 'EditProfile',
            });
          }}
          onWalletPress={() => {
            props.navigation.navigate('ProfileNavigator', {
              screen: 'Wallet',
            });
          }}
          isButtonsEnabled={true}
        />
        <InfoCard
          contentList={[
            {
              title: 'First name',
              value: user?.accountInfo.name,
            },
            {
              title: 'Last name',
              value: user?.accountInfo.surname,
            },
            {
              title: 'Email',
              value: user?.accountInfo.email,
            },
          ]}
          title="Account Info"
          cardStyle={{marginBottom: 24, height: 174}}
        />
        <InfoCard
          contentList={[
            {
              title: 'Balance',
              value: '$' + user?.balanceInfo.totalBalance,
            },
            {
              title: 'TradeBalance',
              value: '$' + user?.balanceInfo.tradeBalance,
            },
            {
              title: 'TotalProfit',
              value:
                '$' +
                user?.balanceInfo.profitAmount +
                ' / ' +
                user?.balanceInfo.profitPercent +
                '%',
              valueStyle: {color: Colors.greenMain},
            },
            {
              title: 'APY',
              value: user?.balanceInfo.APY + '%',
              valueStyle: {color: Colors.greenMain},
            },
            {
              title: 'DDY',
              value: user?.balanceInfo.DDY + '%',
              valueStyle: {color: Colors.greenMain},
            },
            {
              title: 'Notifications',
              value: user?.balanceInfo.notifications ? 'On' : 'off',
              valueStyle: {
                color: user?.balanceInfo.notifications
                  ? Colors.greenMain
                  : Colors.red,
              },
            },
          ]}
          title="Balance Info"
          cardStyle={{marginBottom: 24, height: 244}}
        />
      </ScrollView>
    );
  }
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Profile',
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
    },
    headerTitleAlign: 'center',
  };
};

const styles = StyleSheet.create({});

export default ProfileScreen;
