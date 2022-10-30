import { onAuthStateChanged } from "firebase/auth";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase";
import { loginUser } from "../../utils/redux/loginSlice";
import { logout } from "../../utils/redux/logoutSlice.js";
import style from "./login.module.scss";
import { sendPasswordResetEmail } from "firebase/auth";

const initialState = {
  email: "",
  password: "",
};

const Login = ({ setIsRegistered }) => {
  const currentUser = useSelector((state) => state?.currentUser?.currentUser);
  const nav = useNavigate();

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;
    dispatch(loginUser({ email, password }));

    setValues(initialState);
    e.target.reset();
    localStorage.setItem("currentUser", JSON.stringify());
    nav("/");
  };

  const passwordResetByEmail = () => {
    if (!values.email) return;
    sendPasswordResetEmail(auth, values.email);
    alert("check you email");
  };

  return (
    <div className={style.login}>
      <h1>ברוך הבא למערכת</h1>
      <h2>הזן את פרטיך</h2>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.box}>
          <label htmlFor="email" className={style.label}>
            אימייל
          </label>
          <input
            type="email"
            required
            name="email"
            className={style.input}
            onChange={handleChange}
          />
        </div>
        <div className={style.box}>
          <label htmlFor="password" className={style.label}>
            סיסמא
          </label>
          <input
            type="password"
            required
            name="password"
            className={style.input}
            onChange={handleChange}
          />
        </div>
        <button className={style.btn}>כנס</button>
      </form>
      <button className={style.btn} onClick={() => setIsRegistered(false)}>
        אין לך משתמש? הרשם
      </button>
      <button className={style.btn} onClick={passwordResetByEmail}>
        שכחת סיסמא?
      </button>
    </div>
  );
};

export default Login;
