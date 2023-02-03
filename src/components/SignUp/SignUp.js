import React from "react";
import styles from "./SignUp.module.css";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

// const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();
import axios from "axios";
axios.defaults.withCredentials = true;
// import qs from 'query-string'
// import navigate from 'react-router-dom'
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('')
  const [password2, setPassword2] = useState('')

  console.log(email);
  console.log(password);

  function submitHandler(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
      name: name,
      password2: password2,
    };

    function responseHandler(res) {
      console.log(res)
      if (res.data.msg !== "registration successfully") {
        console.log("error");
      } else navigate("/login");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/register/", {
        'email': email,
        'password': password,
        'name': name,
        'password2': password2,
      } )
      .then((res) => responseHandler(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.formContainer}>
      <div className="innerContainer">
        <h1>Sign up please</h1>
        <form method="POST" onSubmit={submitHandler}>
          <p className={styles.username}>Name</p>
          <input
            type="text"
            name="name"
            placeholder="name"
            id="1"
            className={isValid ? styles.userInputValid : styles.userInput}
            onChange={(e) => setName(e.target.value)}
          />
          <p className={styles.username}>Email</p>
          <input
            type="text"
            name="username"
            placeholder="Email"
            id="1"
            className={isValid ? styles.userInputValid : styles.userInput}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.username}>Password</p>
          <input
            type="text"
            name="password"
            placeholder="Password"
            id="2"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.userInput}
          />
          <p className={styles.username}>Confirm password</p>
          <input
            type="text"
            name="password2"
            placeholder="Password2"
            id="2"
            onChange={(e) => setPassword2(e.target.value)}
            className={styles.userInput}
          />
          <button className={styles.logInBtn} onClick={submitHandler}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
