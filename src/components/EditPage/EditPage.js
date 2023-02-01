import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditPage.module.css";
import { useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML, ContentState } from "draft-js";
import { useEffect } from "react";

export default function EditPage(isEdit) {
  const location = useLocation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  const [blogTitle, setBlogTitle] = useState("");
  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }
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
          const htmlData = res.data.blogContent;
          const blogTitle = res.data.blogTitle;
          const inputElement = document.getElementById("titleInput");
          inputElement.value = `${blogTitle}`;
          const blocksFromHTML = convertFromHTML(htmlData);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );

          setEditorState(EditorState.createWithContent(contentState));
        })
        .catch((err) => console.log(err));
    }
    fetchBlog(location.state.blogId);
  }, []);
  const updateHandler = () => {
    console.log(convertToRaw(editorState.getCurrentContent()));
    const data = {
      blogContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      blogTitle: blogTitle,
      blogText: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
      blogRawContentData: convertToRaw(editorState.getCurrentContent()),
      blogId: location.state.blogId,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .put("http://localhost:8080/blog/update", config, data)
      .then((res) => {
        navigate("/blogPage", { state: { blogId: res.data.blogId } });
      })
      .catch((err) => console.log("error"));
  };
  return (
    <div className={styles.container}>
      <div className="blank"></div>
      <div className={styles.main}>
        <div className={styles.title}>Enter Title here</div>
        <input
          type="text"
          id="titleInput"
          placeholder="Enter Tittle here"
          className={styles.titleInput}
          onChange={(event) => {
            setBlogTitle(event.target.value);
          }}
        />
        <div className={styles.blogHere}>Enter blog here</div>

        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName={styles.textarea}
          editorClassName={styles.editor}
          onEditorStateChange={onEditorStateChange}
        />
        <button className={styles.editorSubmitButton} onClick={updateHandler}>
          {" "}
          Update
        </button>
      </div>

      <div className="blank"></div>
    </div>
  );
}
