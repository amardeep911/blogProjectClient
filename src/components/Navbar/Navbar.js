import React from 'react'
import styles from './navbar.module.css'
const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <div className="logo">Logo</div>
        <div className={styles.items}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
        </div>
        <div className="user">Amardeep Ranjan</div>
    </div>
  )
}

export default Navbar