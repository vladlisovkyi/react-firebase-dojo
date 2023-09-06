import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // Realtime document data
  useEffect(() => {
    const ref = doc(db, collection, id);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        // Need to make sure the doc exists & has data
        if (snapshot.exists()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.error(err.message);
        setError("Failed to get document");
      }
    );

    // Unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
