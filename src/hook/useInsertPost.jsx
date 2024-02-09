import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userInsertPost = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  //memory leak
  const [cancelled, setCancelled] = useState(false);

  const CheckCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertPost = async (document) => {
    CheckCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newPost = { ...document, createAt: Timestamp.now() };

      const insertedPost = await addDoc(collection(db, docCollection), newPost);
    
      CheckCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedPost,
      });
    } catch (error) {
        CheckCancelBeforeDispatch({
            type: "ERROR",
            payload: error.message,
          });
    }
  };
  useEffect(()=>{
    return () => setCancelled(true)
  },[])
  return {insertPost, response}
};
