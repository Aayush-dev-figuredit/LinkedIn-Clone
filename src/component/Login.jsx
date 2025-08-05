import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   const navigate=useNavigate();
  async function submitHandler(e){
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:5000/auth/login",{
        method:"post",
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email, password})
      })
      const data=await response.json();
      if(response.ok){
        console.log("Login Successfull");
        setTimeout(() => {
          navigate("/profile")
        }, 1000);
        
      }
    }catch(err){
      console.error(err);
      
    }
  }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [message, setMessage] = useState("")
  return (
 <> 
 {/* <h1>Welcome to profile</h1> */}
 <form  onSubmit={submitHandler} action="">
         <label htmlFor="">
        Email: <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
    </label>
     <label htmlFor="">
        Password: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </label>
    <button type="submit">Submit</button>
 </form>
 </>
  )
}

export default Login