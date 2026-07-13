import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {

  const [username , setUserName] = useState(""); //jeva usestate setUserName chi value anel teva username chi value change hoil and same for others 
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigateTo = useNavigate();//yachyamule dusrya route vr navigate hota yeta ex aplayala login vr jaychya signup vrun

  const handleRegister= async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:4001/user/signup" , {
        username,
        email,
        password
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json" //apan backend made json format cha use krtoy tyamule ithe pan json ghyava lagla
        }
      })
      console.log(data)
      toast.success(data.message || "User Registered Successfully!")
      localStorage.setItem("jwt" , data.token); 
      navigateTo("/Login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        "User Registration Failed!"
        );
      }
  }
  return (
    <div>
      <div>
        <div className='flex h-screen items-center justify-center bg-gray-100'>
          <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-5 text-center'>Signup</h2>
            <form onSubmit={handleRegister} noValidate>
              {/* Username */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Username</label>
                <input 
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" 
                placeholder='Enter Username'
                value={username}
                onChange={(e)=>setUserName(e.target.value)} />
              </div>
              {/* email */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Email</label>
                <input 
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" 
                placeholder='Enter Email' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              {/* Pasword */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Password</label>
                <input 
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" 
                placeholder='Enter Password' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3'>Signup</button>
              <p className='mt-4 text-center text-gray-600'>
                Alredy have an account ? <Link className='text-blue-600 hover:underline' to={"/login"}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
