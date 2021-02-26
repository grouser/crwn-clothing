import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDDm2nnAVDaH3KX5oW8-hhtMc27uT1SQCs",
    authDomain: "crwn-db-98d8d.firebaseapp.com",
    projectId: "crwn-db-98d8d",
    storageBucket: "crwn-db-98d8d.appspot.com",
    messagingSenderId: "589327048312",
    appId: "1:589327048312:web:36b426240f94524621d78d",
    measurementId: "G-EV9KJWEBMM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try{
            userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }catch (error) {
            console.log('Error creating user: ', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;