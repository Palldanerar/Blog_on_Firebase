import React from "react";
import { auth, provoder } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigation = useNavigate();

  const singInWithGoogle = () => {
    signInWithPopup(auth, provoder).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigation("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Sing In With Google to Continue</p>
      <button
        className="login-with-google-btn"
        onClick={singInWithGoogle}
      >
        Sing in with Google
      </button>
    </div>
  );
};

export default Login;
