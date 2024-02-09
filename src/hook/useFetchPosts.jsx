import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchPost = (docColletion, search = null, uid = null) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setERR] = useState(null);
  //memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function LoadData() {
      if (error) {
        return;
      }
      setLoading(true);
      const CollectionRef = await collection(db, docColletion);

      try {
        let q;
        if (search) {
          q = await query(
            CollectionRef,
            where("title", "==", search),
            orderBy("createAt", "desc")
          );
        } else if (uid){
          q = await query(
            CollectionRef,
            where("uid", "==", uid),
            orderBy("createAt", "desc")
          );
        }
        
        
        else {
          q = await query(CollectionRef, orderBy("createAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setPost(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
      setLoading(false);
    }
    LoadData();
  }, [docColletion, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { post, error, loading };
};
