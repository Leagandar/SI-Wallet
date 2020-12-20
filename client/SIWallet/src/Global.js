export const fonts = {
  BALSAMIQ_BOLD: 'BalsamiqSans-Bold',
  BALSAMIQ_BOLD_ITALIC: 'BalsamiqSans-BoldItalic',
  BALSAMIQ_ITALIC: 'BalsamiqSans-Italic',
  BALSAMIQ_REGULAR: 'BalsamiqSans-Regular',
};

let TOKEN = '';

export const SERVER_ADDRESS = 'http://5d207144e415.ngrok.io';

export function getToken() {
  return TOKEN;
}

export function setToken(token) {
  TOKEN = token;
}

export function getErrorMessage(errorId, source, details = true) {
  let message;
  switch (errorId) {
    case 'email must be an email':
      message = 'Invalid email, try again';
      break;
    case 'User with this username already exists':
      message = 'User with this username already exists';
      break;
    case 'Wrong login or password':
      message = 'Wrong email or password';
      break;
    default:
      message = 'Something went wrong';
  }
  if (details) {
    return `Возникла ошибка в ${source} => ` + message;
  } else {
    return message;
  }
}
