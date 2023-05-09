import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  import {
    AboutPage,
    MainPage,
    PostsDetails,
    PostsPage,
  } from "../../pages";
  import { NavbarMenu } from "../";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  const App = () => {
    return (
      <Router>
        <NavbarMenu />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <MainPage />
              </Protected>
            }
          />
          <Route
            path="/about"
            element={
              <Protected>
                <AboutPage />
              </Protected>
            }
          />
          <Route 
            path="/posts"
            element={
              <Protected >
                <PostsPage  />
              </Protected>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <Protected>
                <PostsDetails />
              </Protected>
            }
          />
          <Route path="*" element={<div>Not found 404</div>} />
        </Routes>
      </Router>
    );
  };
  
  const Protected = ({ children }) => {
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) return navigate("/");
    }, []);
  
    return children;
  };
  
  export default App;
  