import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";

export default function Login() {
  const [input,setInput]=useState({
    fullName:"",
    email:"",
    password:"",
    role:""

  })
  const navigate = useNavigate()
  const changeEventHandler = (e) =>{
    const {name,value} = e.target
    setInput({...input,[name]:value})
  }
 
   const submitHandler = async (e) => {
     e.preventDefault();
     console.log(input);

    

   

     try {
       const res = await axios.post(
         `${USER_API_ENDPOINT}/login`,
         input,
         {
           headers: { "Content-Type":"application/json" },
           withCredentials: true,
         }
       );

       if (res.data.success) {
         console.log(res.data.message);
         navigate("/");
       }
     } catch (error) {
       console.error(error.response?.data?.message || error.message);
     }
   };
  return (
    <div>
      <Navbar />
      <div>
        <form onSubmit={submitHandler}>
          <h1>Login</h1>

          <div>
            <label htmlFor="">Email </label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter you name"
            />
          </div>
          <div>
            <label htmlFor="">Role </label>
            <div>
              <label htmlFor="">Student</label>
              <input
                type="radio"
                name="role"
                value="Student"
                checked={input.role === "Student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="">Recruiter </label>
              <input
                type="radio"
                name="role"
                checked={input.role === "Recruiter"}
                onChange={changeEventHandler}
                value="Recruiter"
                className="cursor-pointer"
              />
            </div>
          </div>

          <button type="submit" className="block w-full py-3 text-white bg-prmiary hover:bg-prmiary/90 rounded-md bg-blue-600">
            Login now
          </button>
          <p>
            I don't have an account <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
