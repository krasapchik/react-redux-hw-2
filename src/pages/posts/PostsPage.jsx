import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import calsses from './PostsPage.module.css';

const PostsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={calsses.container}>
      {loading || !users.length
        ? "loading..."
        : users.map((el) => {
            return (
              <div key={el.id} className={calsses.content}>
                <h1 className={calsses.nav}>{el.id} <br /> {el.title}
                 <button onClick={() => navigate(`/posts/${el.id}`)}>Details</button></h1>
                 <div className={calsses.ser}> <div className={calsses.text}>{ el.body}</div>
                <Link to={`/posts/${el.id}`}> More... </Link> </div>
              </div>
            );
          })}
    </div>
  );
};

export default PostsPage;
