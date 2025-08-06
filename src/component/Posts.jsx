const PostsSection = ({ posts }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded-xl shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-lg mb-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-800">
                {post.user?.fullName || 'Anonymous'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsSection;
