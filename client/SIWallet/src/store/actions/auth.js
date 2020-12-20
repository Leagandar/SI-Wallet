import AsyncStorage from '@react-native-community/async-storage';
import * as Constants from '../../Global';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_WALLET_INFO = 'SET_WALLET_INFO';

export const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const signup = (userId, token) => {
  return async (dispatch) => {
    dispatch(authenticate(userId, token));
    saveDataToStorage(token, userId);
  };
};

export const login = (userId, token) => {
  return async (dispatch) => {
    dispatch(authenticate(userId, token));
    saveDataToStorage(token, userId);
  };
};

export const setUserInfo = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      userInfo: data,
    });
  };
};

export const setWalletInfo = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_WALLET_INFO,
      wallet: data,
    });
  };
};

export const editUserInfo = () => {
  return async (dispatch) => {
    //saveDataToStorage(resData.token, resData.user);
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

export const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
    }),
  );
};
