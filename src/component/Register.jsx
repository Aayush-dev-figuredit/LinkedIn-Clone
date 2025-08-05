import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();
    function submitHandler(e){
        e.preventDefault();
        getData();

    }
     async function getData(){
        try{
        const response=await fetch("http://localhost:5000/auth/register",{
            method:'POST',
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })
        const data=await response.json();
        if(response.ok){
            setMessage("Registration was succesful")
            setEmail("");
            setName("");
            setPassword("");
              setTimeout(() => {
                navigate('/login'); 
             }, 1000); 
        }
    }catch(err){
        console.log(err);
        setMessage("Registration failed please try aagain")
     }
    }
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
  return (
    <>
    <form method='post' onSubmit={submitHandler} action="">
    <label htmlFor="">
        Name: <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} />
    </label>
     <label htmlFor="">
        Email: <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} />
    </label>
     <label htmlFor="">
        Password: <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} />
    </label>
    <button type="submit">Submit</button>
    </form>
    {message && <p>{message}</p>}
    </>
  )
}

export default Register