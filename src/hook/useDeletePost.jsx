import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeletePost = (docCollection) => {
  const navigate = useNavigate()
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  //memory leak
  const [cancelled, setCancelled] = useState(false);

  const CheckCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const DeletePost = async (id) => {
    CheckCancelBeforeDispatch({
      type: "LOADING",
    });
    console.log("AOI");
    console.log(id);
    try {

      const DeletedPost = await deleteDoc(doc(db,docCollection, id));
    
      CheckCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: DeletedPost,
      });
      navigate (`/dashboard`)
    } catch (error) {
      console.log(error.message);
        CheckCancelBeforeDispatch({
            type: "ERROR",
            payload: error.message,
          });
    }
  };
  useEffect(()=>{
    return () => setCancelled(true)
  },[])
  return {DeletePost, response}
};

