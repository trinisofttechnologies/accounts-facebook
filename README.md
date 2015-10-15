# Summary
Login with facebook on web and phonegap
# Requirement
1. Create your own custom package in your app package folder and add facebook cordova plugin dependencies
```
Cordova.depends({
  // Facebook Login Plugin
  'phonegap-facebook-plugin': 'https://github.com/Wizcorp/phonegap-facebook-plugin/tarball/c0f8da97a1d65397ada73e958dafed3aeef2e491'
});
```
2. Add facebook appID in your mobile-config.js file
```
App.configurePlugin('phonegap-facebook-plugin', {
  APP_ID: '123456789',
  APP_NAME: 'MyAwesomeApp'
});
```
3. add package ```meteor add trinsofttechnologies:accounts-facebook```

# Usage
```javascript
Meteor.loginWithFacebook(facebookAppId, ["public_profile"], function(err){
    // it will either logs you in with browser or native facebook app
    // your code
});
```