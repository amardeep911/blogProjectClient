import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './NewEditor.module.css'
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useRef } from "react";

export default function TextEditor2() {

  return (
    <div className={styles.container}>
    <div className="blank"></div>
    <div className={styles.main}>
    <div className={styles.title}>Enter Title here</div>
    <input
        type="text"
        placeholder="Enter Tittle here"
        className={styles.titleInput}
      />
     <div className={styles.blogHere}>Enter blog here</div>
     <textarea className={styles.textarea} placeholder="Tell your story...">
        
     </textarea>
     <button className={styles.editorSubmitButton}> Submit</button>
    </div>
   
    <div className="blank"></div>
  </div>
  );
}
