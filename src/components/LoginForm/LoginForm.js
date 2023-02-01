import React from "react";
import styles from "./loginForm.module.css";
import "./loginForm.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../../assets/images/background.png";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../actions/user_action";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { LogOutUser } from "../../actions/user_action";
import { getUser } from "../../api/User";
axios.defaults.withCredentials = true;
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  useEffect(() => {
    async function getAuth() {
      try {
        const user = await getUser();
        if (!user) {
          dispatch(LogOutUser());

          return;
        }
        dispatch(LoginUser());

        navigate("/homePage");
      } catch (err) {
        console.log(err);
        dispatch(LogOutUser());
      }
    }
    getAuth();
  }, []);
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
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.left}>
            <div className={styles.title}>Welcome on board!</div>
            <div className={styles.logInText}>
              Lorem Ipsem askdfnn dfie fl sieg ia wlghji lih zpobu wmw wtyuib di
              akvh dkho kwn bil vi dl eiqnb.
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.username}>Username</div>
            <input
              type="email"
              name="username"
              id="#"
              placeholder="email"
              className={styles.userInput}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <div className={styles.password}>Password</div>
            <input
              type="text"
              name="password"
              placeholder="Password"
              id="#"
              className={styles.userInput}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <div className={styles.btn}>
              <button className={styles.logInScreenBtn} onClick={submitHandler}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
