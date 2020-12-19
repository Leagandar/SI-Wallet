import * as NetworkWorker from './NetworkWorker';
import * as Constants from '../Global';

export async function checkSession(userId, token) {
  let resData;

  resData = await NetworkWorker.postServerResponse(
    `/user/check-session`,
    JSON.stringify({
      user: userId,
      token: token,
    }),
    5000,
  );

  if (resData.statusCode !== 200) {
    return resData;
  } else {
    return resData;
  }
}

export async function login(email, password) {
  let resData;
  resData = await NetworkWorker.postServerResponse(
    `/login`,
    JSON.stringify({
      email: email,
      password: password,
    }),
  );
  return resData;
}

export async function signup(email, password) {
  let resData;
  resData = await NetworkWorker.postServerResponse(
    `/signup`,
    JSON.stringify({
      email: email,
      password: password,
    }),
  );
  return resData;
}
