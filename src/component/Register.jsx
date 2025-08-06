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
                navigate('/createProfile'); 
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
  <form
    onSubmit={submitHandler}
    className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 space-y-5"
  >
    <h2 className="text-2xl font-semibold text-center text-indigo-600">Register</h2>

    <div>
      <label className="block text-sm font-medium text-indigo-700 mb-1">
        Name
      </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="John Doe"
        className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-indigo-700 mb-1">
        Email
      </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="john@example.com"
        className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-indigo-700 mb-1">
        Password
      </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="••••••••"
        className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
    >
      Submit
    </button>
  </form>

  {message && (
    <p className="text-center text-sm mt-4 text-red-600 font-medium">
      {message}
    </p>
  )}
</>

  )
}

export default Register