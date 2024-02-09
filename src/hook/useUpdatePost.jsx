import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const UpdateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdatePost = (docCollection) => {
  const [response, dispatch] = useReducer(UpdateReducer, initialState);

  //memory leak
  const [cancelled, setCancelled] = useState(false);

  const CheckCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updatePost = async (id, data) => {
    CheckCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const docRef = await doc(db,docCollection, id)

      const UpdatedPost = await updateDoc(docRef, data)
    
      CheckCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: UpdatedPost,
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
  return {updatePost, response}
};
