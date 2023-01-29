import React from 'react'
import styles from './navbar.module.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isClosed, setIsClosed] = useState(true);

  function showHandler(){
    setIsClosed(!true)
  }
  const navigate = useNavigate();
   function submitHandler(){
    navigate("/editor")
  }
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        BlogsKart
      </div>
      <div className={styles.items}>
        
        <ul className={styles.list}>
          <li><a href="#">Home</a></li>
          <li><a href="#">My Blogs</a></li>
          <li><a href="#" onClick={submitHandler}>Write Blog</a></li>
          <li><a href="#">About me</a></li>
        </ul>
      </div>
      <div className={styles.btn}>
        <button className={styles.navbarButton}>LogOut</button>
        
      </div>
      
    </div>
  )
}

export default Navbar