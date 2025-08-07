// components/Posts.jsx
const Posts = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="text-gray-500">No posts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded-xl border shadow">
          <p>{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
