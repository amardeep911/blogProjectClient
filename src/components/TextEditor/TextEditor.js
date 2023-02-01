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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  const [blogTitle, setBlogTitle] = useState("");
  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }
  // const onPreview = () => {
  //   const displayElement = myRef.current;
  //   displayElement.innerHTML = `${draftToHtml(
  //     convertToRaw(editorState.getCurrentContent())
  //   )}`;
  //   setRefresh((state) => !state);
  // };
  const blogSaveHandler = () => {
    console.log(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
    const data = {
      blogContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      blogTitle: blogTitle,
      blogText: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
      blogRawContentData: convertToRaw(editorState.getCurrentContent()),
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .post("http://localhost:8080/blog/save", config, data)
      .then((res) => {
        navigate("/blogpage", { state: { blogId: res.data.blogId } });
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
        <button className={styles.editorSubmitButton} onClick={blogSaveHandler}>
          {" "}
          Submit
        </button>
      </div>

      <div className="blank"></div>
    </div>
  );
}
