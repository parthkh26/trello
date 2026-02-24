import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore" 
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  projectId: import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);