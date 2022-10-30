import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { auth } from "../../utils/firebase/firebase";
import style from "./home.module.scss";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const currentUser = useSelector((state) => state?.currentUser?.currentUser);
  const nav = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && nav("/");
    });
  }, [auth]);

  return (
    <div className={style.home}>
      <div className={style.container}>
        {isRegistered ? (
          <Login setIsRegistered={setIsRegistered} />
        ) : (
          <Signup setIsRegistered={setIsRegistered} />
        )}
      </div>
    </div>
  );
};

export default Home;
