import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc, getDoc
} from "firebase/firestore";

export const useFetchSPost = (docColletion, id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setERR] = useState(null);
  
  //memory leak

  useEffect(() => {
    async function LoadDOC() {
      if (error) {
        return;
      }
      setLoading(true);
      
      try {
         const docREF = await doc(db, docColletion, id)
         const docSNAP = await getDoc(docREF)
         setPost(docSNAP.data())
      } catch (error) {
        console.log(error);
        setERR(error.message);
      }


      setLoading(false);
    }
    LoadDOC();
  }, [docColletion, id]);

  

  return { post, error, loading };
};
