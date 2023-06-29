import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth") || false);
  });

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigation("/login");
    });
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {isAuth && <Link to="/create">Create Post</Link>}
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={singUserOut}>Log Out</button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/create"
          element={<CreatePost />}
        />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
      </Routes>
    </>
  );
}

export default App;
