Accounts.registerLoginHandler("loginWithFacebook",function(options) {
    if(!options.loginWithFacebook) {
        return undefined;
    }
    var userId = null;
    var user = Meteor.users.findOne({"_id": options._id});
    if(!user)
        options.userId = userId = Meteor.users.insert(options);
    else
        options.userId = userId = user._id;
    var stampedToken = Accounts._generateStampedLoginToken();
    var hashStampedToken = Accounts._hashStampedToken(stampedToken);
    Meteor.users.update(userId,
        {$push: {'services.resume.loginTokens': hashStampedToken}}
      );
    return {
        _id: userId,
        userId: userId,
        token: stampedToken.token
    };
});
