import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider }  from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore";


//import 'firebase/firestore';
//import 'firebase/auth';

const config = {

    apiKey: "AIzaSyChFeYJYVrJbvMMPxcdr0_VvA9q-w1oxF0",
  
    authDomain: "db-mimi.firebaseapp.com",
  
    projectId: "db-mimi",
  
    storageBucket: "db-mimi.appspot.com",
  
    messagingSenderId: "1093630987077",
  
    appId: "1:1093630987077:web:89cfeffb15cd1f4d6c0c2c",
  
    measurementId: "G-5GML2RXSJD"
  
  };
  
  const app = initializeApp(config);

const analytics = getAnalytics(app);

export const auth=getAuth();
export const firestore = getFirestore();
const provider = new GoogleAuthProvider();

export const createUserProfileDocument = async (userAuth, additionalData)=>{
    
  if (!userAuth) return;
const userRef = doc(firestore,'users',userAuth.uid);
const snapShot = await getDoc(userRef);

  if (!snapShot.exists()){
    const {displayName, email}=userAuth;
    console.log(displayName);
    const createdAt = new Date();
    try {
      await setDoc(userRef,{displayName,email,createdAt,...additionalData})
    } catch (error)
    {
        console.log('error creating user', error.message);
    }
  }
   

    return userRef;
}

//provider.setCustomParamaters({ prompt: 'select_account' });
export const SignInWithGoogle = () => signInWithPopup(auth,provider);

//export default firebase;