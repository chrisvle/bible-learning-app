// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDrWwfZi2599OOob4Ni2UHFMQuszXz8xyM',
    authDomain: 'bible-learning-app.firebaseapp.com',
    databaseUrl: 'https://bible-learning-app.firebaseio.com',
    projectId: 'bible-learning-app',
    storageBucket: 'bible-learning-app.appspot.com'
  },
  restrictedEmailDomain: '@gpmail.org'
};
