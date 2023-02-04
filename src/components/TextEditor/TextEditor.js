import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./TextEditor.module.css";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default function TextEditor2(isEdit) {
  const navigate = useNavigate();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('')
  console.log(blogTitle)
  console.log(blogContent)

  // const onPreview = () => {
  //   const displayElement = myRef.current;
  //   displayElement.innerHTML = `${draftToHtml(
  //     convertToRaw(editorState.getCurrentContent())
  //   )}`;
  //   setRefresh((state) => !state);
  // };
  const blogSaveHandler = () => {
    const data = {
      blogTitle: blogTitle,
      blogContent: blogContent
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/postBlog/", {
        blogContent: blogContent,
        blogTitle: blogTitle,
      })
      .then((res) => {
        navigate("/homePage")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.container}>
      <div className="blank"></div>
      <div className={styles.main}>
        <div className={styles.title}>Enter Title here</div>
        <input
          type="text"
          placeholder="Enter Tittle here"
          className={styles.titleInput}
          onChange={(event) => {
            setBlogTitle(event.target.value);
          }}
        />
        <div className={styles.blogHere}>Enter blog here</div>
        <input
          type="text"
          placeholder="Enter Blog here"
          className={styles.titleInput}
          onChange={(event) => {
            setBlogContent(event.target.value);
          }}
        />
        
        <button className={styles.editorSubmitButton} onClick={blogSaveHandler}>
          {" "}
          Submit
        </button>
      </div>

      <div className="blank"></div>
    </div>
  );
}
