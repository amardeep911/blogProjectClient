import React from "react";
import styles from "../Card/card.module.css";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();
  function navigationHandler() {
    navigate("/blogpage", { state: { blogId: props.id } });
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.username}>{props.userName}</div>
        <div className={styles.title} onClick={navigationHandler}>
          {props.title}
        </div>
        <div className={styles.content} onClick={navigationHandler}>
          {props.content}
        </div>
        <div className={styles.footer}>{props.date}</div>
      </div>
      <div className={styles.right}>
        <img
          className={styles.img}
          src={
            "https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          }
          alt="not rendered"
        />
      </div>
    </div>
  );
}

export default Card;
