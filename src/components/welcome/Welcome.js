import React, { useState } from "react";
import styles from "./welcome.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../actions/user_action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "../Card/Card";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Welcome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  function logOutHandler() {
    dispatch(LogOutUser());
    console.log(user.loggedIn);
  }
  function createNewHandler() {
    navigate("/editor");
  }
  const [blogsArray, setBlogsArray] = useState([]);

  const notify = () => toast("Log in successfully");
  useEffect(() => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:8000/api/user/getllblog/", config)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setBlogsArray([...data]);
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(blogsArray);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.blank}></div>
          <div className={styles.blog} id={"blogsContainer"}>
            {blogsArray.map((item) => {
              return (
                <Card
                  userName={"Amardeep"}
                  title={item.blogTitle}
                  content={item.blogContent}
                  date={"21th january"}
                  id={item.blogId}
                  key={item.blogId}
                />
              );
            })}

            {/* <button onClick={createNewHandler}>Create New</button> */}
          </div>
          <div className={styles.blank}></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Welcome;
