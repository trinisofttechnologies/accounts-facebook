var debug = false;
var init = function(facebookId, callback){
  if(window.FB || Meteor.isCordova){
    callback();
    return;
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : facebookId,
      xfbml      : true,
      version    : 'v2.2'
    });
    callback();
  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

var fbLogin = function(scope, callback) {
  if(Meteor.isCordova){
    facebookConnectPlugin.login( ["public_profile"],
      function (response) {
        fetchUser(scope, response, callback);
      },
      function (response) {
        callback({"err": response.errorMessage})
      });
  }
  else{
    FB.login( function(response) {
      if (response.authResponse) {
        fetchUser(scope, response, callback);
      } else {
        callback({"err": "User canceled login"}, null);
      }
    },
    {scope: scope});
  }
}

// alert(JSON.stringify(user));
var fetchUser = function(scope, response, callback){
  if(Meteor.isCordova){
  var authResponse = response.authResponse;
  facebookConnectPlugin.api( "me/?fields=picture,name", scope,
    function (user) {
      createUser({"user": user, "authResponse": authResponse}, callback);
    },
    function (user) {
      createUser({"user": user, "authResponse": authResponse}, callback);
    });
  }else{
    FB.api('/me?fields=id,picture,name', function(user) {
        var authResponse = response.authResponse
        createUser({"user": user, "authResponse": authResponse}, callback);
    });
  }
}

var createUser = function(opt, callback){
  try{
    var users = {};
    var user = opt.user;
    var authResponse = opt.authResponse;
    if(!authResponse)
        authResponse = {};
    if(user.picture)
    if (user.picture.data) {
        profilePictureUrl = user.picture.data.url;
    } else {
        profilePictureUrl = user.picture;
    }
    var users = {"username":user.username,"email":user.email,"_id":user.id,"name":user.name};

    users.profile = {};
    users.services = {"facebook": {"token":authResponse.accessToken,"expire":authResponse.expirationTime}};
    users.profile.profile_picture  = profilePictureUrl;
    users.profile.full_name = user.name;
    users.profile.createdAt = new Date().getTime();
    loginWithFacebook(users, callback);
  }catch(err){
    callback(err);
  }
}
var loginWithFacebook = function(options,callback){
  options.loginWithFacebook = true;
  Accounts.callLoginMethod({
    methodArguments: [options],
    userCallback: callback
  });
}

Meteor.loginWithFacebook = function(facebookId, scope, callback, debugFlag){
  debug = debugFlag;
  init(facebookId, function(){
    fbLogin(scope, callback);
  });
}