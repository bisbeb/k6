import http from 'k6/http';

/**
 * Authenticate using OAuth against Azure Active Directory
 * @function
 * @param  {string} clientId - Application ID in Azure
 * @param  {string} clientSecret - Can be obtained from https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app#create-a-client-secret
 * @param  {string} scope - Space-separated list of scopes (permissions) that are already given consent to by admin
 * @param  {string} resource - Either a resource ID (as string) or an object containing username and password
 */
export function authenticateUsingKC(clientId, clientSecret, scope, resource) {
  let url;
  const requestBody = {
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope,
  };

  if (typeof resource == 'string') {
    url = `https://192.168.1.165:8443/auth/realms/testlab.org/protocol/openid-connect/token`;
    requestBody['grant_type'] = 'client_credentials';
    requestBody['resource'] = resource;
  } else if (
    typeof resource == 'object' &&
    resource.hasOwnProperty('username') &&
    resource.hasOwnProperty('password')
  ) {
    url = `https://192.168.1.165:8443/auth/realms/testlab.org/protocol/openid-connect/token`;
    requestBody['grant_type'] = 'password';
    requestBody['username'] = resource.username;
    requestBody['password'] = resource.password;
  } else {
    throw 'resource should be either a string or an object containing username and password';
  }

  const response = http.post(url, requestBody);
  return response.json();
}
