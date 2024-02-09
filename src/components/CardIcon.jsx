import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "./CardIcon.css"

const CardIcon = ({ post }) => {
  const go = useNavigate()
  return (
    <div className="IconContainer">
      <Link to={`/posts/${post.id}`}>
        <div className="Card">
          <img src={post.image} alt={post.title} />
        </div>
      </Link>
    </div>
  );
};

export default CardIcon;
