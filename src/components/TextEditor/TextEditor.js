import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useRef } from "react";

export default function TextEditor2() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blogTitle, setBlogTitle] = useState("");
  const [refresh, setRefresh] = useState(false);
  const myRef = useRef(null);
  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }
  const onPreview = () => {
    const displayElement = myRef.current;
    displayElement.innerHTML = `${draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )}`;
    setRefresh((state) => !state);
  };
  const blogSaveHandler = () => {
    const data = {
      blogContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      blogTitle: blogTitle,
      blogText: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
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
    <div>
      <input
        type="text"
        placeholder="Enter tittle here"
        onChange={(event) => {
          setBlogTitle(event.target.value);
        }}
      />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />

      <div
        ref={myRef}
        style={{
          width: "100%",
          height: "auto",
          border: "2px solid black",
        }}
      ></div>
      <button onClick={onPreview}>PREVIEW</button>
      <button onClick={blogSaveHandler}>Save</button>
    </div>
  );
}
