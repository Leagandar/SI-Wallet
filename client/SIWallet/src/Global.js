export const fonts = {
  BALSAMIQ_BOLD: 'BalsamiqSans-Bold',
  BALSAMIQ_BOLD_ITALIC: 'BalsamiqSans-BoldItalic',
  BALSAMIQ_ITALIC: 'BalsamiqSans-Italic',
  BALSAMIQ_REGULAR: 'BalsamiqSans-Regular',
};

let TOKEN = '';

export const SERVER_ADDRESS = 'https://karmik.ua/api';

export function getToken() {
  return TOKEN;
}

export function setToken(token) {
  TOKEN = token;
}
