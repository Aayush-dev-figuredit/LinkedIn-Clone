import { useEffect, useState } from "react";

const PublicFeed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/auth/publicfeed")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError(data.message || "Error loading posts");
        }
      })
      .catch(() => setError("Server error"));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">🌍 Public Feed</h1>

      {error && <p className="text-red-500">{error}</p>}

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl p-4 shadow mb-4">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              by <strong>{post.user.name || "Unknown"}</strong> on{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicFeed;
