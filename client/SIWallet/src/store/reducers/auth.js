import {AUTHENTICATE, LOGOUT, EDIT_USER_INFO} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  user: null,
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

    default:
      return state;
  }
};
