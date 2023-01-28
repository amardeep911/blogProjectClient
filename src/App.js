import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import SignUp from "./components/SignUp/SignUp";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoutes from "./routerutils/PrivateRoutes";
import Landing from "./components/Lanidng/Landing";
import BlogPage from "./components/BlogPage/Blog";

import TextEditor from "./components/TextEditor/TextEditor";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/homePage" element={<Welcome />} />
        <Route path="/editor" element={<TextEditor />} />
        <Route path="/blogpage" element={<BlogPage />} />
      </Route>

      <Route path="/login" element={<LoginForm />} />
      <Route path="/card" element={<Card />} />
      <Route path="/nav" element={<Navbar />} />

      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
