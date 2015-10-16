# Summary
Login with facebook on web and phonegap

# Adding package
```meteor add trinsofttechnologies:accounts-facebook```

# Requirement
1. Add facebook appID in your mobile-config.js file
```
App.configurePlugin('phonegap-facebook-plugin', {
  APP_ID: '123456789',
  APP_NAME: 'MyAwesomeApp'
});
```

# Usage
```javascript
Meteor.loginWithFacebook(facebookAppId, ["public_profile"], function(err){
    // it will either logs you in with browser or native facebook app
    // your code
});
```