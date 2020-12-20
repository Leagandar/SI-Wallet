import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as Constants from '../Global';
import * as AuthApi from '../API/AuthAPI';
import {CommonActions} from '@react-navigation/native';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          console.log('UNAUTHORAZIED');
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Auth'}],
            }),
          );

          return;
        }
        const transformedData = JSON.parse(userData);
        const {token, userId} = transformedData;

        result = await AuthApi.checkSession(token);

        if (!result) {
          console.log('result error', result);
          throw new Error('Something went wrong');
        }
        if (result.statusCode === 200) {
          console.log('result', result);
          dispatch(authActions.authenticate(userId, token));

          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'TabNavigator'}],
            }),
          );
        } else {
          const errorId = result.data.errors?.[0];
          let message = Constants.getErrorMessage(
            errorId,
            'StartupScreen/checkSession',
          );
          throw new Error(message);
        }
      } catch (err) {
        dispatch(authActions.logout());
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Auth'}],
          }),
        );
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blackBackground,
      }}>
      <ActivityIndicator size="large" color={Colors.greenMain} />
    </View>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = (navData) => {
  return {
    headerTitle: '',
    headerBackground: (props) => (
      <LinearGradient
        colors={Colors.mainGradient}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
    ),
  };
};

export default StartupScreen;
