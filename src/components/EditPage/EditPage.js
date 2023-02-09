import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditPage.module.css";
import { useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { LoginUser } from "../../actions/user_action";
import { LogOutUser } from "../../actions/user_action";
import { getUser } from "../../api/User";
import { convertFromHTML, ContentState } from "draft-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EditPage(isEdit) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("")
  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }
  useEffect(() => {
    
   

    async function getAuth() {
      try {
        const user = await getUser();
        if (!user) {
          dispatch(LogOutUser());
          return;
        }
        dispatch(LoginUser());
        navigate("/editpage");
      } catch (err) {
        console.log(err);
        dispatch(LogOutUser());
      }
    }
    getAuth();

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

      axios
        .post("http://127.0.0.1:8000/api/user/getSingleBlog/", {blogId:id})
        .then((res) => {
          console.log(res.data.data)
          // const blogTitle = document.getElementById("titleInput");
          setBlogTitle(res.data.data.blogTitle)
          // blogTitle.value = res.data.data.blogTitle;
          // const blogContent = document.getElementById("blogContent");
          setBlogContent(res.data.data.blogContent)
          // blogContent.value = res.data.data.blogContent;

        })
        .catch((err) => console.log(err));
    }
    fetchBlog(location.state.blogId);
  }, []);
  const updateHandler = () => {
    axios
      .post("http://127.0.0.1:8000/api/user/updateBlog/", {'blogId': id, 'blogContent': blogContent, 'blogTitle': blogTitle})
      .then((res) => {
        navigate("/homePage")
      })
      .catch((err) => console.log("error"));
  };
  return (
    <div className={styles.container}>
      <div className="blank"></div>
      <div className={styles.main}>
        <div className={styles.title}>Enter Title</div>
        <input
          type="text"
          id="titleInput"
          placeholder="Enter Tittle here"
          className={styles.titleInput}
          onChange={(event) => {
            setBlogTitle(event.target.value);
          }}
          value={blogTitle}
        />
        <div className={styles.blogHere}>Enter Blog</div>

        <textarea name="blog" id="blogContent" placeholder="Tell your story" onChange={(event)=> {setBlogContent(event.currentTarget.value)}} value={blogContent} className={styles.textarea}></textarea>
        <button class="btn mt-2 btn-success" onClick={updateHandler}>Update</button>
      </div>

      <div className="blank"></div>
    </div>
  );
}
