import React from "react";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import './singup.css'
import {MdPassword} from "react-icons/md"
import signUp from '../../assets/images/signup.jpg'
import {FaUserCircle} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import axios from "axios";
axios.defaults.withCredentials = true;

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('')
  const [password2, setPassword2] = useState('')

  function ValidateEmail(mail) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    const notify = () => toast.error("Email is not valid!!!");
    notify()
    return (false)
     
  }
  function submitHandler(event) {
    ValidateEmail(email)
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
    if(password != password2){
      const notify = () => toast.error("Password and confirm password not matched");
      notify();
    
    }
    else {
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
            <ToastContainer />
        </section>
    
  );
}

export default SignUp;
