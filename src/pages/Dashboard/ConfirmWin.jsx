import React from "react";
import "./CW.css";
import { useParams } from "react-router-dom";
import { userDeletePost } from "../../hook/useDeletePost";
import { useNavigate } from "react-router-dom";
import { useFetchPost } from "../../hook/useFetchPosts";
import { useAuthValue } from "../../context/AuthContext";

const ConfirmWin = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthValue();
  const { post, error, loading } = useFetchSPost("posts", id);
  const { DeletePost } = userDeletePost("posts");
  console.log(id);


  const handleDelete = () =>{
    if(post && user){
      if(user.uid === post.uid){
        DeletePost(id)
        navegate(`/dashboard`);
      }else{
        navegate(`/dashboard`);
      }
    }
  }
  return (
    <div className="ContainerWin">
      <div className="boxW">
        <h1>Deseja mesmo esxluir?</h1>
        <button onClick={handleDelete} className="DEL">
          Excluir
        </button>
        <button onClick={() => navegate(`/dashboard`)} className="CAN">
          Cancelar
        </button>
      </div>
      <div className="backG" />
    </div>
  );
};

export default ConfirmWin;
