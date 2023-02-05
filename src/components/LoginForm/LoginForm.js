import React from "react";
import styles from "./loginForm.module.css";
import "./loginForm.module.css";
import { useRef, useState } from "react";
import './login.css'
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
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
  // useEffect(() => {
  //   async function getAuth() {
  //     try {
  //       const user = await getUser();
  //       if (!user) {
  //         dispatch(LogOutUser());

  //         return;
  //       }
  //       dispatch(LoginUser());

  //       navigate("/homePage");
  //     } catch (err) {
  //       console.log(err);
  //       dispatch(LogOutUser());
  //     }
  //   }
  //   getAuth();
  // }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  function responseHandler(res) {

    if (res.data.msg !== "Log in Screen") {
      alert("wrong ceredential");
    } else {
      dispatch(LoginUser());
      navigate("/homePage");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    const data = {
      'email': email,
      'password': password,
    };
    const config = {
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: data,
    };

    axios
      .post("http://localhost:8000/api/user/login/", {email: email, password: password},{ withCredentials: true })
      .then((res) => responseHandler(res))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.left}>
            <div className={styles.title}>Welcome on board!</div>
            <div className={styles.logInText}>
            Be the first to know about latest updates, volunteer opportunities, events, and more. <br/> Stories and updates from the Unspoken Smiles team, partners, and supporters. Dontate.
            </div>
          </div>
          <div className={styles.right}>
          <div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required="" onChange={(e) => setEmail(e.currentTarget.value)}/>
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" onChange={(e) => setPassword(e.currentTarget.value)}/>
      <label>Password</label>
    </div>
    <a href="#" onClick={submitHandler}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
