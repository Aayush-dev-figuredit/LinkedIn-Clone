import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/dashboard" className="text-indigo-600 font-semibold">Home</Link>
        <Link to="/dashboard/feed" className="text-indigo-600 font-semibold">Public Feed</Link>
        <Link to="/profile" className="text-indigo-600 font-semibold">Profile</Link>
      </nav>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
