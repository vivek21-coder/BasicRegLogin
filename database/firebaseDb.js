// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDdZ03glBJ5XeImnk1o5JbfyRoezke9ONw",
  authDomain: "basicreglogin.firebaseapp.com",
  databaseURL: "https://basicreglogin.firebaseio.com",
  projectId: "basicreglogin",
  storageBucket: "basicreglogin.appspot.com",
  messagingSenderId: "345598143447",
  appId: "1:345598143447:web:09d786f99e945268603992",
  measurementId: "G-RPW3B2VKMV"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
