import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

// const projectFirestore = firebase.firestore()
// const projectAuth = firebase.auth()
// const projectStorage = firebase.storage()

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

// export const timestamp = firebase.firestore.Timestamp;
