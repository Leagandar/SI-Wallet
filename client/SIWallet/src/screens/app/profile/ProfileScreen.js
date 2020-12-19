import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import InfoCard from '../../../components/profileScreen/InfoCard';
import UserPreviewCard from '../../../components/profileScreen/UserPreviewCard';
import {useSelector, useDispatch} from 'react-redux';
import * as UserAPI from '../../../API/UserAPI';

const ProfileScreen = (props) => {
  let {userId, token} = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();

  const loadUserinfo = useCallback(async (userId, token) => {
    let result;
    setIsLoading(true);
    setLoadingError(undefined);

    try {
      result = await UserAPI.getUsersInfo(userId, token, [userId], appLanguage);
      if (result.statusCode === 200) {
        setCurrentUser(result.data.users[userId]);
      } else {
        const errorId = result.data.errors?.[0];
        let message = Constants.getErrorMessage(
          errorId,
          'AccountScreen/getUserInfo',
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
    loadUserinfo(userId, token);
  }, [userId, token]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <UserPreviewCard
        userName="Graham Stephan"
        userBalance={'8.210,00'}
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
            value: 'Graham',
          },
          {
            title: 'Last name',
            value: 'Stephan',
          },
          {
            title: 'Email',
            value: 'gram.stephan@gmail.com',
          },
          {
            title: 'Phone',
            value: '+14845101972',
          },
        ]}
        title="Account Info"
        cardStyle={{marginBottom: 24, height: 194}}
      />
      <InfoCard
        contentList={[
          {
            title: 'Balance',
            value: '$7.240,16',
          },
          {
            title: 'TradeBalance',
            value: '$768,16',
          },
          {
            title: 'TotalProfit',
            value: '$2300,21/7,61%',
            valueStyle: {color: Colors.greenMain},
          },
          {
            title: 'APY',
            value: '73%',
            valueStyle: {color: Colors.greenMain},
          },
          {
            title: 'DDY',
            value: '0,23%',
            valueStyle: {color: Colors.greenMain},
          },
          {
            title: 'Notifications',
            value: 'On',
            valueStyle: {color: Colors.greenMain},
          },
        ]}
        title="Balance Info"
        cardStyle={{marginBottom: 24, height: 244}}
      />
    </ScrollView>
  );
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
