import React from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import style from "./styles.css";
import styles from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  function submitHandler() {
    navigate("/editor");
  }
  function showSettings(event) {
    event.preventDefault();
  }
  return (
    <>
      <Menu styles={style} className={"my-menu"} right={true}>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="create" className="menu-item" href="/ff">
          Contact
        </a>
        <a onClick={showSettings} className="menu-item--small" href="/">
          Settings
        </a>
      </Menu>
      <div className={styles.container}>
        <div className={styles.logo}>BlogsKart</div>
        <div className={styles.items}>
          <ul className={styles.list}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">My Blogs</a>
            </li>
            <li>
              <a href="/" onClick={submitHandler}>
                Write Blog
              </a>
            </li>
            <li>
              <a href="/">About me</a>
            </li>
          </ul>
        </div>
        <div className={styles.btn}>
          <button className={styles.navbarButton}>LogOut</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
