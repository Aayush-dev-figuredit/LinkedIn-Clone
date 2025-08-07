import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import BioSection from './Bio';
import EducationSection from './Education';
import SkillsSection from './Skills';
import Navbar from './Navbar';

function Profile() {
  const navigate=useNavigate();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // ✅ Added for posts
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?._id) {
      fetchUserPosts(profile._id);
    }
  }, [profile]);

  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:5000/auth/profile", {
        credentials: 'include',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Server error');
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserPosts(userId) {
    try {
      const res = await fetch("http://localhost:5000/auth/myposts",{
          credentials: 'include',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }        
      });
      const data = await res.json();
      setUserPosts(data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  }

  if (loading) return <div className="text-center text-gray-500 mt-8">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  if (!profile) return <div className="text-center text-gray-500 mt-8">No profile found</div>;

  return (
    <>
    <Navbar />
    <div className="text-right mb-4">
  {/* <button
    onClick={() => navigate("/createpost")}
    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
  >
    Create Post
  </button> */}
</div>

    <div className="max-w-3xl mx-auto my-8 p-4">
      <ProfileHeader
        fullName={profile.fullName}
        headline={profile.headline || profile.bio}
        location={profile.location}
      />
      <BioSection bio={profile.bio} />
      <EducationSection education={profile.education || ''} />
      <SkillsSection skills={profile.skills || []} />
      <div className="mt-10">
  <h2 className="text-xl font-semibold text-indigo-700 mb-4">Your Posts</h2>

  {userPosts.length === 0 ? (
    <p className="text-gray-500">You haven't posted anything yet.</p>
  ) : (
    <ul className="space-y-4">
      { Array.isArray(userPosts) &&userPosts.map((post) => (
        <li key={post._id} className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-800">{post.content}</p>
          <p className="text-sm text-gray-400 mt-2">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )}
</div>

      <div className="text-right mb-4">
  <button
    onClick={() => navigate("/create-post")}
    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
  >
    Create Post
  </button>
</div>


      {/* ✅ Render user's own posts */}
    </div>
    </>
  );
}

export default Profile;
