import * as NetworkWorker from './NetworkWorker';
import * as Constants from '../Global';

export async function editUserInfo(token, name, surname) {
  console.log('TOKEN');
  console.log(token, name, surname);
  let result = [];
  result = await NetworkWorker.postServerResponse(
    `/api/v1/user/update`,
    JSON.stringify({
      name: name,
      surname: surname,
    }),
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return result;
}

export async function getUserInfo(token) {
  let result = [];
  result = await NetworkWorker.getServerResponse(
    `/api/v1/user`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return result;
}

export async function getWalletInfo(userId, token) {
  let result = [];
  result = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/allbalance`,
    JSON.stringify({
      token: token,
      user: userId,
      users_id: userIds,
      language: language,
    }),
  );
  return result;
}
