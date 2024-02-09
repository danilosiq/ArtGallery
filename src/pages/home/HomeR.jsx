import React from "react";
import "./HomeR.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchPost } from "../../hook/useFetchPosts";
import PosrtCard from "../../components/PosrtCard";
import { useQuery } from "../../hook/useQuery";
import CardIcon from "../../components/CardIcon";

const HomeR = () => {
  const query = useQuery();
  const search = query.get("q");
  const [aa, setSearch] = useState("");

  console.log(search);
  const navegate = useNavigate();
  const { post: HomePOST, error, loading } = useFetchPost("posts", search);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (search) {
      navegate(`/search?q=${aa}`);
    }
  };
  return (
    <div className="Result">
      <div className="intro">
        <h1 className="title">Posts relacionado: {search}</h1>
        <form onSubmit={handlesubmit} className="searchForm">
          <input
            type="text"
            className="searchCamp"
            placeholder="Pesquisar"
            value={aa}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Pesquisar</button>
        </form>
      </div>
      <div className="postCamp">
        {HomePOST &&
          HomePOST.map((post) => <CardIcon key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default HomeR;
