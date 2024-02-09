import React from "react";
import { useParams } from "react-router-dom";
import { useFetchSPost } from "../../hook/useFetchSPost";
import PosrtCard from "../../components/PosrtCard";
import "./IndiPag.css"

const IndiPag = () => {
  const { id } = useParams();
  const { post: IndiPost, loading} = useFetchSPost("posts",id);
  console.log(IndiPost);


  return (
    <div className="IndiPostContainer">
      {loading && <p>Carregando...</p>}
      {IndiPost && <PosrtCard post={IndiPost}/>}
    </div>
  );
};

export default IndiPag;
