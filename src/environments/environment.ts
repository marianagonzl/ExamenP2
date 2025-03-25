// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC_NCVNS129n1egthSg-Q8RXwq3QWmduNE",
  authDomain: "examenp2-f1a48.firebaseapp.com",
  projectId: "examenp2-f1a48",
  storageBucket: "examenp2-f1a48.firebasestorage.app",
  messagingSenderId: "541077098577",
  appId: "1:541077098577:web:ca3ca12e4e82ccd7c3a870"
  },

};

const app = initializeApp(environment.firebaseConfig);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
