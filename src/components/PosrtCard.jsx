import React from "react";
import { useFetchPost } from "../hook/useFetchPosts";
import "./PostCard.css";
import { useQuery } from "../hook/useQuery";
import { useAuthValue } from "../context/AuthContext";
import { Link } from "react-router-dom";

const PosrtCard = ({ post }) => {
  return (
    <div className="postContainer">
      <div className="Card" >
        <div className="ImgPost">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="InfPost">
        <div>
                <h1>{post.title}</h1>
                <p>{post.tags +","} </p>
              </div>
              <div className="ComentsCamp">
                <p>{post.content}</p>
              </div>
              <div className="Accont">{post.displayName}</div>
        </div>
      </div>
    </div>
  );
};

export default PosrtCard;
