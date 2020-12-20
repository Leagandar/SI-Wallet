import * as NetworkWorker from './NetworkWorker';

export async function getNews(token, page) {
  let resData;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/news`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return resData;
}
