import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD-qlFbFP8j_hw0vWcB_6s2_oT8_owBLtU",
  authDomain: "sell-clothes-868e1.firebaseapp.com",
  projectId: "sell-clothes-868e1",
  storageBucket: "sell-clothes-868e1.appspot.com",
  messagingSenderId: "97939912105",
  appId: "1:97939912105:web:3984b65a53f26cafd100b8",
  measurementId: "${config.measurementId}",
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