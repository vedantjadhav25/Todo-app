import React from 'react';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import PageNotFound from './components/PageNotFound.jsx';
import {useNavigate, Route, Routes} from "react-router-dom"
import { Toaster } from 'react-hot-toast';

function App() {
  const token = localStorage.getItem("jwt")
  return <div>
    {/* <Home />
    <Login/>
    <Signup/> */}
    <Routes>
      <Route path="/" element = {<Signup/>}/>
      <Route path="/Home" element = {token?<Home/>:<Navigate to={"/Login"}/>}/>
      <Route path="/Login" element = {<Login/>}/>
      <Route path="/Signup" element = {<Signup/>}/>
      <Route path="*" element = {<PageNotFound/>}/> // * mhanje universal routing
    </Routes>
    <Toaster />
  </div>
}

export default App;
