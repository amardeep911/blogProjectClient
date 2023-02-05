import React from "react";
import styles from "./SignUp.module.css";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import './singup.css'
import {MdPassword} from "react-icons/md"
import signUp from '../../assets/images/signup.jpg'
import {FaUserCircle} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
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
  
       <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" onSubmit={submitHandler} class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><FaUserCircle size={20}/> </label>
                                <input type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="email"><HiOutlineMail size={20}/> </label>
                                <input type="email"  onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label for="pass"><MdPassword size={20}/> </label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} name="pass" id="pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><MdPassword size={20}/></label>
                                <input type="password" onChange={(e) => setPassword2(e.target.value)} name="re_pass" id="re_pass" placeholder="Repeat your password" />
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                    <figure onClick={submitHandler}><img src={signUp} alt="sing up image"/></figure>
                        <a href="/login" class="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>
    
  );
}

export default SignUp;
