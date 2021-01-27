// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/19646c18-1578-452e-b5fb-8504eb919aaa/',
    clientId: '603c30a3-e177-454f-a984-0d901aa2f27f',
    redirectUri: 'https://intelligentdisp-d.snamretegas.priv/'
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: ["User.Read"],
  
}
 
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: 'https://login.microsoftonline.com/19646c18-1578-452e-b5fb-8504eb919aaa/oauth2/v2.0/token' + '/auth.html'
}

const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
 
export default authProvider;

