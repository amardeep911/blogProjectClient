import React, { useState } from "react";
import styles from "./Blog.module.css";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const BlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('')

  useEffect(() => {
    //fetch blog from server
    async function fetchBlog(id) {
      setId(id)
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          blogId: id,
        },
      };
      const data = { blogId: id}

      axios
        .post("http://127.0.0.1:8000/api/user/getSingleBlog/", {blogId:id})
        .then((res) => {
          const displayElement = document.getElementById("displayElement");
          displayElement.innerHTML = `${res.data.data.blogContent}`;
          const headingBlog = document.getElementById("blogHeading");
          headingBlog.innerText = `${res.data.data.blogTitle}`;
        })
        .catch((err) => console.log(err));
    }
    fetchBlog(location.state.blogId);
  }, []);

  function editBlogHandler() {
    navigate("/editpage", {
      state: { blogId: location.state.blogId, isEdit: true },
    });
  }
  function backHandler() {
    navigate("/homePage");
  }
  function deleteHandler() {
    console.log("df");
    const blogId = location.state.blogId;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        blogId: blogId,
      },
    };
    axios
      .post("http://127.0.0.1:8000/api/user/deleteBlog/", {blogId:id})
      .then((res) =>
        navigate("/homePage")
      )
      .catch((err) => console.log("There is an error in deleting blog"));
  }

  return (
    <div className={styles.container}>
      <div className={styles.blank}></div>
      <div className={styles.blogContent}>
        <h1 className={styles.heading} id={"blogHeading"}>
          temp
        </h1>
        <div className={styles.blogText} id="displayElement">
          {isLoading && <div>Blog is lOADING</div>}
        </div>
        <button onClick={editBlogHandler}> Edit </button>
        <button onClick={backHandler}> Home Page </button>
        <button onClick={deleteHandler}> Delte Blog</button>
      </div>
    </div>
  );
};

export default BlogPage;
