import React from "react";
import styles from "./loginForm.module.css";
import "./loginForm.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { LoginUser } from "../../actions/user_action";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, isValid] = useState(true);
  console.log(email);

  console.log(password);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  function responseHandler(res) {
    console.log(res);
    if (res.data.message !== "userCreated") {
      alert("wrong ceredential");
    } else {
      dispatch(LoginUser());
      navigate("/homePage");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .post("http://localhost:8080/auth/login", config, data)
      .then((res) => responseHandler(res))
      .catch((err) => console.log("error"));
  }
  const change = valid ? "userInput" : "styles.userInputValid";
  return (
    <div className={styles.formContainer}>
      <div className="innerContainer">
        <h1>Log in please...</h1>
        <form method="POST" onSubmit={submitHandler}>
          <p className={styles.username}>Username</p>
          <input
            type="email"
            name="username"
            id="#"
            placeholder="Username"
            className={styles.userInput}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <p className={styles.username}>Password</p>
          <input
            type="text"
            name="password"
            placeholder="Password"
            id="#"
            className={styles.userInput}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className={styles.logInBtn} onClick={submitHandler}>
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
