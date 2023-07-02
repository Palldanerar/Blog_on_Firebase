import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import FullPost from "./pages/FullPost";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("")
  const navigation = useNavigate();

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth") || false);
    setUserName(localStorage.getItem("userName") || "")
  });

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUserName("")
      navigation("/login");
    });
  };

  return (
    <>
      <nav>
        <Link to="/">Главная</Link>
        {isAuth && <Link to="/create">Создать</Link>}
        {!isAuth ? (
          <Link to="/login">Войти</Link>
        ) : (
          <button
            className="btn-singOut"
            onClick={singUserOut}
          >
            Вы вошли как {userName}
          </button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} setIsAuth={setUserName} />}
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
        <Route
          path="/post/:id"
          element={<FullPost isAuth={isAuth} />}
        />
      </Routes>
    </>
  );
}

export default App;
