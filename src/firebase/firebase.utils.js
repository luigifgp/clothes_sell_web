import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAa2YWe1PsQZPgt8cMoYcarF9RQNWGEJMA",
    authDomain: "crwn-db-f7cda.firebaseapp.com",
    databaseURL: "https://crwn-db-f7cda.firebaseio.com",
    projectId: "crwn-db-f7cda",
    storageBucket: "crwn-db-f7cda.appspot.com",
    messagingSenderId: "853633541447",
    appId: "1:853633541447:web:11a8cac87b8f46021e9862",
    measurementId: "G-8CMV9E8946"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;