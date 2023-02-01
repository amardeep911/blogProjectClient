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
        <div className={styles.title} onClick={navigationHandler}>
          {props.title}
        </div>
        <div className={styles.content} onClick={navigationHandler}>
          {props.content}
        </div>
        <div className={styles.footer}>{props.date}</div>
      </div>
    </div>
  );
}

export default Card;
