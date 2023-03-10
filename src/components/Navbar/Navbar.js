import React from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import style from "./styles.css";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  function logoutHandler(){
    localStorage.clear('token');
    navigate('/')
  }
  function submitHandler() {
    navigate("/editor", {
      state: { isEdit: false },
    });
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
        <a
          id="Write blog"
          className="menu-item"
          href="#"
          onClick={submitHandler}
        >
          Write blogs
        </a>
      </Menu>
      <div className={styles.container}>
        <div className={styles.logo}>BlogsKart</div>

        <ul className={styles.list}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About me</a>
          </li>
          { user.loggedIn ? (<>
            <li>
            <a href="/">My Blogs</a>
          </li>
          <li>
            <a href="#" onClick={submitHandler}>
              Write Blog
            </a>
          </li> 
          <li>
            <button class = "btn btn-danger" onClick={logoutHandler}>Logout</button>
          </li>
          
         </> ): ''}
          
        </ul>
      </div>
    </>
  );
};

export default Navbar;
