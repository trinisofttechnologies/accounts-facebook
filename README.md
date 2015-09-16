# Summary
If you want to install a modified version of meteor login with facebook, here's a way.
I doesn't work with meteor add packagename, instead follow the bellow steps

# Getting started
1. clone the repo, in your package folder
2. then do ```meteor add trinsofttechnologies:accounts-facebook```
3. replace the phonegap package with your own modified version
4. You are good to go

# Usage
```javascript
Meteor.loginAsFacebook(function(err){
    // it will either logs you in with browser or native facebook app
    // your code
});

```