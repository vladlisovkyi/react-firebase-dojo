import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAlp8rtt_6cdVWMJJioEcDj_0SsRJcWeUU",
  authDomain: "thedojo-7f514.firebaseapp.com",
  projectId: "thedojo-7f514",
  storageBucket: "thedojo-7f514.appspot.com",
  messagingSenderId: "866345652197",
  appId: "1:866345652197:web:e73f743e3d57fa34dfe90c",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

