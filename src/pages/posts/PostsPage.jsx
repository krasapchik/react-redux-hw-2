import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./PostsPage.module.css";
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.div}>
      {loading || !posts.length
        ? "loding...."
        : posts.map((el) => {
          
            return (
              <div key={el.id} className={classes.posts}>
              <div className={classes.post}>{el.id} <br /> {el.title}
                 <button onClick={() => navigate(`/posts/${el.id}`)}>Details</button></div>
                 <div className={classes.con}> <div className={classes.body}>{ el.body}</div>
                <Link to={`/posts/${el.id}`}> More... </Link> </div>
                </div>
              
            );
          })}
    </div>
  );
};

export default PostsPage;
