import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Signup({ toggleAuth }) {
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const userSignupFunction= async(e)=>{
    
    try {
      const url="http://localhost:3000/api/auth/signup";
      const response= await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userSignup)
      })
      const result=await response.json();
      
      const {success,error}=result;
      if(success){
        toast.success("Signup Successfully");
        toggleAuth();
      }
      else{
        toast.error(error);
      }

    } catch (error) {
      console.log(error); 
    }

  }


  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <div className="flex gap-2 mt-4">
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-google"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-github"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-linkedin-in"></i></a>
      </div>
      <span className="text-sm mt-3">or use your email for registration</span>
      <input
        onChange={(e) => {
          setUserSignup({
            ...userSignup,
            name: e.target.value
          })
        }} type="text" placeholder="Name" className="w-full p-2 mt-2 bg-gray-200 rounded" />
      <input
        onChange={(e) => {
          setUserSignup({
            ...userSignup,
            email: e.target.value
          })
        }} type="email" placeholder="Email" className="w-full p-2 mt-2 bg-gray-200 rounded" />
      <input
        onChange={(e) => {
          setUserSignup({
            ...userSignup,
            password: e.target.value
          })
        }} type="password" placeholder="Password" className="w-full p-2 mt-2 bg-gray-200 rounded" />
      <button
      onClick={userSignupFunction}
      className="w-full bg-purple-600 text-white py-2 rounded mt-2">Sign Up</button>
      <p className="mt-4 text-sm">
        Already have an account? 
        <button className="text-purple-600" onClick={toggleAuth}>Sign In</button>
      </p>
    </div>
  );
}
