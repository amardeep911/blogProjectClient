import React from "react";
import styles from "./loginForm.module.css";
import "./loginForm.module.css";
import { useRef, useState } from "react";
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  const notify = () => toast.error("Email is not valid!!!");
  notify()
  return (false)
   
}
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    async function getAuth() {
      try {
        const user = await getUser();
        console.log(user)
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('token')
  console.log(token)
  function responseHandler(res) {

    if (res.data.msg !== "Log in Screen") {
      const notify = () => toast.error("Password or username not matched!!!");
      notify();
    } else {
      // dispatch(LoginUser(res.data.token.access));
  
      dispatch(LoginUser(res.data.token.access))
      localStorage.setItem('token', JSON.stringify(res.data.token.access))
      navigate("/homePage");
    }
  }
  function submitHandler(event) {
    event.preventDefault();
    ValidateEmail(email)
    if(password == ""){
      const notify = () => toast.error("plz enter password!!!");
      notify();
      return false
    }
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
      <ToastContainer />
    </>
  );
}

export default LoginForm;
