import * as Constants from '../Global';

export function timeout(time, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout error!'));
    }, time);
    promise.then(resolve, reject);
  });
}

export async function postServerResponse(
  url,
  body,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'POST',
    includeHeaders,
    contentType,
  );

  return result;
}

export async function putServerResponse(
  url,
  body,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'PUT',
    includeHeaders,
    contentType,
  );

  return result;
}

export async function deleteServerResponse(
  url,
  body,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'DELETE',
    includeHeaders,
    contentType,
  );

  return result;
}

export async function getServerResponse(
  url,
  body,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'GET',
    includeHeaders,
    contentType,
  );

  return result;
}

async function serverResponse(
  url,
  body,
  out = 30000,
  type,
  includeHeaders,
  contentType,
) {
  let result = {};
  let status = 0;

  await timeout(
    out,
    fetch(Constants.SERVER_ADDRESS + url, {
      method: type,
      headers: includeHeaders
        ? {
            'Content-Type': contentType,
          }
        : {},
      body: type == 'POST' || type == 'PUT' ? body : null,
    }),
  )
    .then((res) => {
      status = res.status;
      let response = [];

      try {
        response = res.json();
      } finally {
      }

      return response;
    })
    .then((res) => {
      result.data = res;
      result.statusCode = status;

      //result.status = strings('Errors.Status' + status)
    })
    .catch((err) => {
      console.log('BRUH, THERE IS AN ERROR');
      throw new Error(err);
      //throw strings('Errors.timeout')
    });

  return result;
}
