addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

const apiHost = 'https://api.steemit.com';

async function handleRequest(request) {
  const url = new URL(request.url);
  const arr = url.pathname.split('/');
  if (arr[2] === 'getAccount') {
    return getAccounts(arr[3]);
  } else {
    return new Response('error', {status: 503});
  }
}

async function getAccounts(username = 'ety001') {
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
    body: `{"jsonrpc":"2.0", "method":"condenser_api.get_accounts", "params":[["${username}"]], "id":1}`,
  }
  return await fetch(apiHost, init);
}
