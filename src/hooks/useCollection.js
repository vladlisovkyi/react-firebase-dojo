import { useEffect, useState, useRef } from "react";
import { collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderByField = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (query) {
      ref = where(ref, ...query);
    }
    if (orderByField) {
      ref = orderBy(ref, ...orderByField);
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError("Could not fetch the data");
      }
    );

    // Unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, query, orderByField]);

  return { documents, error };
};
