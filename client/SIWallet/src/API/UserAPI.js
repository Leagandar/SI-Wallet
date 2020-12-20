import * as NetworkWorker from './NetworkWorker';
import * as Constants from '../Global';

export async function editUserInfo(
  userId,
  token,
  name,
  surname,
  image,
  isRegistration = true,
) {
  console.log('IMAGE');
  console.log(image);
  let resData;

  let data = {};

  if (isRegistration) {
    data.name = name;
    data.surname = surname;
  }

  if (image) {
    data.image = image.value;
  } else {
    data.image = '';
    console.log(data.image);
  }

  data.user = userId;
  data.token = token;

  console.log('OBJECT');
  console.log(data);

  resData = await NetworkWorker.postServerResponse(
    '/user/edit-profile',
    JSON.stringify(data),
  );

  return resData;
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
