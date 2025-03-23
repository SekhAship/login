import React, { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";


export default function Login({ toggleAuth }) {

  const navigate=useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const UserLoginFunction = async (e) => {

    try {
      const url = "http://localhost:3000/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userLogin)
      })
      const result = await response.json();
      const { success,token,name,error } = result;
      if (success) {
        toast.success("Login Successfully");

        localStorage.setItem('token',token);
        localStorage.setItem('loggedInUser',name);
        setTimeout(() => {
          navigate("/home")
        }, 1000);
        
        
      }
      else {
        toast.error(error);
      }

    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <div className="flex gap-2 mt-4">
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-google"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-github"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-linkedin-in"></i></a>
      </div>
      <span className="text-sm mt-3">or use your email password</span>
      <input
        onChange={(e) => {
          setUserLogin({
            ...userLogin,
            email: e.target.value
          })
        }}
        type="email" placeholder="Email" className="w-full p-2 mt-2 bg-gray-200 rounded" />
      <input
        onChange={(e) => {
          setUserLogin({
            ...userLogin,
            password: e.target.value
          })
        }}
        type="password" placeholder="Password" className="w-full p-2 mt-2 bg-gray-200 rounded" />
      <a href="#" className="mt-2 text-xs text-gray-600">Forget Your Password?</a>
      <button
      onClick={UserLoginFunction}
      className="mt-4 px-5 py-2 bg-purple-600 text-white rounded">Sign In</button>
      <p className="mt-4 text-sm">
        Don't have an account? <button className="text-purple-600" onClick={toggleAuth}>Sign Up</button>
      </p>
    </div>
  );
}
