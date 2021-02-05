export const detailsList = ['rentPrice', 'rentTime', 'range', 'APY'];

export const iconsByType = {
  rentPrice: 'rentIcon.png',
  rentTime: 'rentTimeIcon',
  range: 'rangeIcon.png',
  APY: 'APYIcon.png',
};

export default [
  {
    title: 'MiniBot',
    rentPrice: 0,
    rentTime: 30,
    tradingBalanceDown: 15,
    tradingBalanceUp: 250,
    range: tradingBalanceDown + '-' + tradingBalanceUp,
    APY: 6,
    id: 'MiniBotID',
  },
  {
    title: 'StandartBot',
    rentPrice: 10,
    rentTime: 60,
    tradingBalanceDown: 45,
    tradingBalanceUp: 700,
    range: tradingBalanceDown + '-' + tradingBalanceUp,
    APY: 9,
    id: 'StandartBotID',
  },
  {
    title: 'ProBot',
    rentPrice: 25,
    rentTime: 90,
    tradingBalanceDown: 100,
    tradingBalanceUp: 2500,
    range: tradingBalanceDown + '-' + tradingBalanceUp,
    APY: 12,
    id: 'ProBotID',
  },
  {
    title: 'NetPremium',
    rentPrice: 100,
    rentTime: 90,
    tradingBalanceDown: 1000,
    tradingBalanceUp: 10000,
    range: tradingBalanceDown + '-' + tradingBalanceUp,
    APY: 24,
    id: 'NetPremiumID',
  },
];
