import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext";
import { auth, db, storage } from "../firebase/config";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const storageRef = ref(
        storage,
        `thumbnails/${res.user.uid}/${thumbnail.name}`
      );
      await uploadBytes(storageRef, thumbnail);
      const imgUrl = await getDownloadURL(storageRef);

      // add display AND PHOTO_URL name to user
      await updateProfile(res.user, {
        displayName,
        photoURL: imgUrl,
      });

      // create a user document
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
