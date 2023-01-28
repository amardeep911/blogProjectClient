import React, { useState } from "react";
import styles from "./Blog.module.css";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const BlogPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //fetch blog from server
    async function fetchBlog(id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          blogId: id,
        },
      };

      axios
        .get("http://localhost:8080/blog/getsingleblog", config, {})
        .then((res) => {
          const displayElement = document.getElementById("displayElement");
          displayElement.innerHTML = `${res.data.blogContent}`;
        })
        .catch((err) => console.log(err));
    }
    fetchBlog(location.state.blogId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.blank}></div>
      <div className={styles.blogContent}>
        <p className={styles.heading}>
          ChatGPT in an iOS Shortcut — Worlds Smartest HomeKit Voice Assistant
        </p>
        <div className={styles.blogText} id="displayElement">
          {isLoading && <div>Blog is lOADING</div>}
        </div>
      </div>
      <div className={styles.blank}></div>
    </div>
  );
};

export default BlogPage;
