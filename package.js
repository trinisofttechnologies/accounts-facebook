Package.describe({
  name: 'trinisofttechnologies:accounts-facebook',
  git: 'https://github.com/trinisofttechnologies/accounts-facebook.git',
  version: '1.0.0',
  summary: 'Login with facebook using cordova native sdk.'
});

Npm.depends({
});

// Cordova.depends({
//   'phonegap-facebook-plugin': 'https://github.com/Wizcorp/phonegap-facebook-plugin/tarball/c0f8da97a1d65397ada73e958dafed3aeef2e491'
// });

Package.on_use(function (api) {
  api.use('accounts-base');
  api.add_files('common.js', ['client', 'server']);
  api.add_files('client.js', ['client']);
  api.add_files('server.js', ['server']);
});