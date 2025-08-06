import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    education: "",
    skills: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("backend Response", data);
      console.log("res.ok", res.ok);
      
      if (res.ok && data.profile) {
        navigate("/profile")
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
<form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-10">
  <h2 className="text-2xl font-semibold text-center text-indigo-600">Create Your Profile</h2>

  <div>
    <label className="block text-sm font-medium text-indigo-700 mb-1">Full Name</label>
    <input
      type="text"
      name="fullName"
      placeholder="John Doe"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-indigo-700 mb-1">Bio</label>
    <textarea
      name="bio"
      placeholder="A little about yourself..."
      onChange={handleChange}
      rows={3}
      className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-indigo-700 mb-1">Education</label>
    <input
      type="text"
      name="education"
      placeholder="B.Tech in Computer Science"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-indigo-700 mb-1">Skills</label>
    <input
      type="text"
      name="skills"
      placeholder="React, Node.js, MongoDB"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-indigo-700 mb-1">Location</label>
    <input
      type="text"
      name="location"
      placeholder="Mumbai, India"
      onChange={handleChange}
      className="w-full px-4 py-2 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-indigo-900"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
  >
    Create Profile
  </button>
</form>

  );
};

export default CreateProfile;
