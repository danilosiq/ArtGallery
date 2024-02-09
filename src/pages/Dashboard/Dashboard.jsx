import React from "react";
import "./Dash.css";
import PosrtCard from "../../components/PosrtCard";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchPost } from "../../hook/useFetchPosts";
import EditCard from "../../components/EditCard";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { post: HomePOST, error, loading } = useFetchPost("posts", null, uid);
  console.log(HomePOST);
  return (
    <div className="DashboardContainer">
      <h1>Seus Posts</h1>
      <div className="postCamp">
        {HomePOST &&
          HomePOST.map((post) => <EditCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Dashboard;
