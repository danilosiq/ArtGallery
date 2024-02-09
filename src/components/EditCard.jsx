import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "./CardIcon.css"

const EditCard = ({ post }) => {
  const go = useNavigate()
  return (
    <div className="IconContainer">
      <Link to={`/edit/${post.id}`}>
        <div className="Card">
          <img src={post.image} alt={post.title} />
        </div>
      </Link>
    </div>
  );
};

export default EditCard;
