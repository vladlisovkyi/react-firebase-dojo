import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    console.log("logout");
    try {
      const user = auth.currentUser;

      // Update online status
      await updateDoc(doc(db, "users", user.uid), {
        online: false,
      });

      // Sign the user out
      await signOut(auth);

      // Dispatch logout action
      dispatch({ type: "LOGOUT" });

      // Update state
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

  return { logout, error, isPending };
};
