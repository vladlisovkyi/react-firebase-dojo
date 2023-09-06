import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config"; // Assuming db is your Firestore instance

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {


      // login
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // update online status
      const documentRef = doc(db, "users", res.user.uid);
      await updateDoc(documentRef, { online: true });

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

  return { login, isPending, error };
};
