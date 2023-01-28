import React, { useState } from "react";
import styles from "./welcome.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../actions/user_action";
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
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:8080/blog/getallblogs", config)
      .then((res) => {
        const data = res.data.blogsArray;
        setBlogsArray((prevState) => [...data]);
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(blogsArray);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.blank}></div>
        <div className={styles.blog} id={"blogsContainer"}>
          {blogsArray.map((item) => {
            return (
              <Card
                userName={"kuldeep"}
                title={item.blogTitle}
                content={item.blogText}
                date={"21th january"}
                id={item._id}
                key={item._id}
              />
            );
          })}

          <button onClick={createNewHandler}>Create New</button>
        </div>
        <div className={styles.blank}></div>
      </div>
    </div>
  );
};

export default Welcome;
