import * as NetworkWorker from './NetworkWorker';

export async function sendTransaction(
  token,
  amount,
  withdrawAddress,
  network,
  sourceAddress,
) {
  let resData;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/blockchain/withdraw`,
    JSON.stringify({
      amount: amount,
      withdrawAddress: withdrawAddress,
      network: network,
      sourceAddress: sourceAddress,
    }),
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

export async function getWalletInfo(token) {
  let resData;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/allBalance`,
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
