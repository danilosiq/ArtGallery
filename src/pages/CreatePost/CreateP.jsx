import React from "react";
import "./CreateP.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthen } from "../../hook/useAthentic";
import { userInsertPost } from "../../hook/useInsertPost";
import { useAuthValue } from "../../context/AuthContext";
import empy from "./empy.png";

const CreateP = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [formERR, setformERR] = useState("");
  const [isAmplified, setIsAmplified] = useState(false);
  const { user } = useAuthValue();

  const navigate = useNavigate();
  const { insertPost, response } = userInsertPost("posts");

  const addTAG = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== ""&& tags.length < 5) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }if(tags.length > 5){
      alert("Tag cheia");
    }
    console.log(tags);
  };

  const handleSubPost = (e) => {
    e.preventDefault();
    const post = {
      title,
      content,
      image,
      tags: tags,
      style: isAmplified,
      uid: user.uid,
      displayName: user.displayName,
    };

    try {
      new URL(image);
    } catch (error) {
      setformERR("URL de imagem inexistente");
    }

    try {
      new URL(image);
    } catch (error) {
      setformERR("URL de imagem inexistente");
    }

    if (Object.values(post).some((value) => value === "")) {
      setformERR("Preencha todos os campos");
      return; // Retorna para evitar a execução adicional do código
    }

    if (formERR) return;
    insertPost(post);
    setTitle("");
    setImage("");
    setContent("");
    setTags("");
    navigate("/");
  };

  const ampliar = () => {
    setIsAmplified(!isAmplified);
  };

  return (
    <div className="CreateContainer">
      <h1>Nova Postagem</h1>
      <div className="form">
        <div className="imgcamp">
          <img src={image ? image : empy} alt="" />
        </div>

        <div className="formCamp">
          <form>
            <label htmlFor="Title">
              Titulo: <br />
              <input
                type="text"
                placeholder="TiTulo"
                className="TitleType"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="url">
              URL da imagem: <br />
              <input
                type="text"
                placeholder="URL da imagem"
                className="SubTitleType"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>

            <label htmlFor="desc">
              Decrição: <br />
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                cols="50"
                className="DescType"
                placeholder="Descrição"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
                Insira aqui sua descrição...
              </textarea>
            </label>

            <label htmlFor="tags">
              <input
                type="text"
                name=""
                id=""
                placeholder="#Tags"
                className="TAGType"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={addTAG} className="ADDB">ADD</button>
            </label>

            <label className="TAGSL">
              {tags && tags.map((tag, index) => <span key={index} className="TAGS">{tag}</span>)}
            </label>


            {!response.loading && (
              <button onClick={handleSubPost} className="postButton">
                Post!
              </button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formERR) && (
              <p className="error">{response.error || formERR}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateP;
