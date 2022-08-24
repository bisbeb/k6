import encoding from 'k6/encoding';
import http from 'k6/http';
import { check } from 'k6';

const username = 'admin';
const password = 'admin';

export default function () {
  const credentials = `${username}:${password}`;

  // Passing username and password as part of the URL will
  // allow us to authenticate using HTTP Basic Auth.
  const url = `http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT`;

  // Alternatively you can create the header yourself to authenticate
  // using HTTP Basic Auth
  const encodedCredentials = encoding.b64encode(credentials);
  const options = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };

  let res = http.get(url, options);

  // Verify response (checking the echoed data from the httpbin.test.k6.io
  // basic auth test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
