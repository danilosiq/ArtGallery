import React, { useEffect, useState } from "react";
import "./PostCard.css";
import "./Editable.css";
import ConfirmWin from "../pages/Dashboard/ConfirmWin";
import { useUpdatePost } from "../hook/useUpdatePost";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

const Editable = ({ post }) => {
  const [WinCon, setWinCon] = useState(false);
  const { updatePost, response } = useUpdatePost("posts");
  const { id } = useParams();
  const { user } = useAuthValue();
  const navegate = useNavigate()

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    if (post) {
      setImage(post.image);
      setTitle(post.title);
      setContent(post.content);
    }
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
        title,
        content,
        image: post.image,
        tags: post.tags,
        style: false,
        uid: user.uid,
        displayName: user.displayName,
    };

    console.log(data);
    updatePost(id,data)
    navegate("/dashboard")
  };
  return (
    <div className="EDIT">
      <div className="Card">
        <div className="IMG">
          <img src={image} alt={post.title} />
        </div>
        <div className="TEXTS">
          <h1>Campo de Edição</h1>
          <form onSubmit={handleEdit}>
            <div className="formCamp">
              <div>
                <label htmlFor="">
                  Nome: <br />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="TitleType"
                  />
                </label>
                <br />
                
              </div>

              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="DescType "
              />
              <button
                onClick={() => {
                  setWinCon(!WinCon);
                  console.log(WinCon);
                }}
                className="EDEL"
              >
                DELETAR
              </button>

              <button className="EditButton">Salvar</button>
            </div>
          </form>
        </div>
      </div>
      {WinCon ? <ConfirmWin /> : ""}
    </div>
  );
};

export default Editable;
