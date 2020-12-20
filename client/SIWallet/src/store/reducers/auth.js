import {
  AUTHENTICATE,
  LOGOUT,
  EDIT_USER_INFO,
  SET_USER_INFO,
  SET_WALLET_INFO
} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  user: null,
  wallet: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;

    case EDIT_USER_INFO:
      return {
        ...state,
        user: action.user,
      };
    case SET_USER_INFO:
      const {
        name,
        surname,
        balance,
        username,
        email,
        id,
        totalBalance,
        tradeBalance,
        APY,
        DDY,
        notifications,
        profitAmount,
        profitPercent,
      } = action.userInfo;
      return {
        ...state,
        user: {
          id: id,
          balance: balance,
          username: username,
          accountInfo: {
            name: name,
            surname: surname,
            email: email,
          },
          balanceInfo: {
            totalBalance: totalBalance,
            tradeBalance: tradeBalance,
            profitAmount: profitAmount,
            profitPercent: profitPercent,
            APY: APY,
            DDY: DDY,
            notifications: notifications,
          },
        },
      };
    case SET_WALLET_INFO:
      return {
        ...state,
        wallet: action.wallet,
      };
    default:
      return state;
  }
};
