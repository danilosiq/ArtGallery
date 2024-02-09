import React from "react";
import "./Home.Module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchPost } from "../../hook/useFetchPosts";
import PosrtCard from "../../components/PosrtCard";
import CardIcon from "../../components/CardIcon";

const Home = () => {
  const navegate = useNavigate();
  const { post: HomePOST, error, loading } = useFetchPost("posts");
  const [search, setSearch] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();

    if (search) {
      navegate(`/search?q=${search}`);
    }
  };
  console.log(search);

  return (

    <div className="HomeContainer">
      <div className="intro">
        <div>
          <h1>Bem vindo!</h1>
          <p>Veja os posts mais recentes:</p>
        </div>
        <form onSubmit={handlesubmit} className="searchForm">
          <input
            type="text"
            className="searchCamp"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Pesquisar</button>
        </form>
      </div>
      <div className="postCamp">
      {HomePOST && HomePOST.map((post) => <CardIcon key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
