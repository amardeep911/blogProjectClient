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
import NewEditor from "./components/NewEditor/NewEditor";
import TextEditor from "./components/TextEditor/TextEditor";
import EditPage from "./components/EditPage/EditPage";
//import
function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/blogpage" element={<BlogPage />} />
      </Route>

      <Route path="/homePage" element={<Welcome />} />
      <Route path="/editpage" element={<EditPage />} />
      <Route path="/editor" element={<TextEditor />} />
      <Route path="/neweditor" element={<NewEditor />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/card" element={<Card />} />
      <Route path="/nav" element={<Navbar />} />

      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
