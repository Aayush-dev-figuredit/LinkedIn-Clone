// components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">LinkedIn</div>
      <div className="flex space-x-4">
        <Link to="/feed" className="hover:underline">Public Feed</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/create-post" className="bg-white text-indigo-600 px-3 py-1 rounded-lg hover:bg-gray-100">
          Create Post
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
