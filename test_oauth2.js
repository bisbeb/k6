import http from 'k6/http';
import { authenticateUsingKC } from './oauth2.js';

export function setup() {
  // Use either password authentication flow
  const passwordAuthResp = authenticateUsingKC(
    "ccb",
    "8250d0e3-4fef-4d6e-b3bd-4f0d16582902",
    "email profile",
    {
      username: "ccb-e2e",
      password: "Swisscom01",
    }
  );

  return passwordAuthResp;

  // Or client credentials authentication flow
  // let clientAuthResp = authenticateUsingAzure(
  //     AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_SCOPES, RESOURCE
  // );
  // return clientAuthResp;

  // // Example of Okta OAuth password authentication flow
  // let oktaPassAuth = authenticateUsingOkta(OKTA_DOMAIN, 'default', OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, OKTA_SCOPES,
  // {
  //     username: USERNAME,
  //     password: PASSWORD
  // });
  // // This should print the authentication tokens
  // console.log(JSON.stringify(oktaPassAuth));
  // return oktaPassAuth;
}

export default function (data) {
  // Then, use the access_token to access a protected resource (user profile)
  // NOTE: access_token from client credentials flow cannot be used to access the user profile
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.access_token}`, // or `Bearer ${clientAuthResp.access_token}`
    },
  };
  const userProfileUrl = 'https://192.168.1.165:8443/auth/realms/testlab.org/account';
  const res = http.get(userProfileUrl, params);

  // Do something with the response
  // For example, this should print the user profile
  console.log(res.status);
}
