import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSPost } from "../../hook/useFetchSPost";
import PosrtCard from "../../components/PosrtCard";
import "./EditPost.css";
import { userDeletePost } from "../../hook/useDeletePost";
import ConfirmWin from "./ConfirmWin";
import Editable from "../../components/Editable";

const EditPost = () => {
  const { id } = useParams();
  const { post } = useFetchSPost("posts", id);
  const navigate = useNavigate();
  const { DeletePost } = userDeletePost("posts");


  return (
    <>
      
      <div className="EditPostContainer">
        <div>
          {post && <Editable post={post} />}
          
        </div>


      </div>
    </>
  );
};

export default EditPost;
