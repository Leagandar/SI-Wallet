import * as NetworkWorker from './NetworkWorker';

export async function checkSession(token) {
  let resData;

  resData = await NetworkWorker.getServerResponse(
    `/api/v1/auth/validateToken`,
    null,
    5000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );

  return resData;
}

export async function login(email, password) {
  let resData;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/auth/login`,
    JSON.stringify({
      email: email,
      password: password,
    }),
  );
  return resData;
}

export async function signup(email, password, username, name, surname) {
  let resData;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/auth/signup`,
    JSON.stringify({
      email: email,
      password: password,
      username: username,
      name: name,
      surname: surname,
    }),
  );
  return resData;
}
