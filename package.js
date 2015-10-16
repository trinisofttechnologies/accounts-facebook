Package.describe({
  name: 'trinisofttechnologies:accounts-facebook',
  git: 'https://github.com/trinisofttechnologies/accounts-facebook.git',
  version: '1.0.2',
  summary: 'Login with facebook using cordova native sdk.'
});

Npm.depends({
});

Cordova.depends({
  'phonegap-facebook-plugin': "0.12.0"
});

Package.on_use(function (api) {
  api.use('accounts-base@1.0.0');
  api.add_files('common.js', ['client', 'server']);
  api.add_files('client.js', ['client']);
  api.add_files('server.js', ['server']);
});