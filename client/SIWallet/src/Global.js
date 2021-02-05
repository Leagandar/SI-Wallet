export const fonts = {
  BALSAMIQ_BOLD: 'BalsamiqSans-Bold',
  BALSAMIQ_BOLD_ITALIC: 'BalsamiqSans-BoldItalic',
  BALSAMIQ_ITALIC: 'BalsamiqSans-Italic',
  BALSAMIQ_REGULAR: 'BalsamiqSans-Regular',
};

let TOKEN = '';

export const SERVER_ADDRESS = 'http://f382b7f942e8.ngrok.io';
export const IMAGES_REPO = '/assets/';

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
    case 'You cannot withdraw more than you have, sorry)':
      message = 'Insufficient balance';
      break;
    case 'Request failed with status code 429':
      message = 'Too many attempts, try later';
      break;
    default:
      message = 'Something went wrong';
  }
  if (details) {
    return `An error occured in ${source} => ` + message;
  } else {
    return message;
  }
}
