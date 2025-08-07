// src/components/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/auth/posts", {
        method: "POST",
        credentials: "include", // if you're using cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setContent("");
        setMessage("Post created!");
        onPostCreated?.(); // Notify parent to re-fetch posts
         setTimeout(() => navigate("/profile"), 1000);
      } else {
        setMessage(data.message || "Failed to create post.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
      >
        Post
      </button>
      {message && <p className="text-sm text-indigo-700">{message}</p>}
    </form>
  );
};

export default CreatePost;
