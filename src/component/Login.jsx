import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-600">Login</h2>

        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {message && (
          <p className="text-center text-sm mt-2 text-red-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
