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


  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;

  }



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;