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

export async function getUsersInfo(userId, token, userIds, language) {
  let result = [];
  result = await NetworkWorker.postServerResponse(
    `/user/profiles`,
    JSON.stringify({
      token: token,
      user: userId,
      users_id: userIds,
      language: language,
    }),
  );
  return result;
}
