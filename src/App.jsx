import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
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
          <button
            className="btn-singOut"
            onClick={singUserOut}
          >
            Вы вошли как
          </button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} />}
        />
        <Route
          path="/create"
          element={<CreatePost />}
        />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
        <Route
          path="/edit/:id"
          element={<EditPost />}
        />
      </Routes>
    </>
  );
}

export default App;
