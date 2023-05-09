import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./PostsPage.module.css";
const PostsDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading || !post ? (
        "Loading..."
      ) : (
        <div className={classes.bos}>
          <button onClick={() => navigate("/posts")}>Back</button><br/>
          <b className={classes.pp}>
            {post.id} <br />
            {post.title}
          </b>
          <div >{post.body}</div>
        </div>
      )}
    </div>
  );
};

export default PostsDetails;
