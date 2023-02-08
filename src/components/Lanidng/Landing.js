import React from "react";
import styles from "./landing.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/User";
import { LogOutUser } from "../../actions/user_action";
import { LoginUser } from "../../actions/user_action";
import Navbar from "../Navbar/Navbar";
const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAuth() {
      try {
        const user = await getUser();
        if (!user) {
          dispatch(LogOutUser());
          setLoading(false);
          return;
        }
        dispatch(LoginUser());
        setLoading(true);
        navigate("/homePage");
      } catch (err) {
        console.log(err);
        dispatch(LogOutUser());
        setLoading(false);
      }
    }
    getAuth();
  }, []);
  function logInHandler() {
    navigate("/login");
  }
  function signUpHandler() {
    navigate("/signUp");
  }
  return loading ? (
    "Loading"
  ) : (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>BlogsKart</h1>
        <h1 className={styles.heading}>
          Thoughts & ideas around the things that actually matter. <br/> Come and join with us...
        </h1>
      </div>
      <div className={styles.right}>
        <p>Log in</p>
        <button class="btn btn-lg btn-success" onClick={logInHandler}>
          Log In
        </button>
        <p>Don't have an account ?</p>
        <button class="btn btn-lg btn-danger" onClick={signUpHandler}>
          Sign Up
        </button>
      </div>
    </div>
    </>
  );
};

export default Landing;
