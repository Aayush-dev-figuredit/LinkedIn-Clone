import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import BioSection from './Bio';
import EducationSection from './Education';
import SkillsSection from './Skills';
import PostsSection from './Posts';

function Profile() {
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
      const res = await fetch(`http://localhost:5000/api/posts/user/${userId}`);
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
    <div className="max-w-3xl mx-auto my-8 p-4">
      <ProfileHeader
        fullName={profile.fullName}
        headline={profile.headline || profile.bio}
        location={profile.location}
      />
      <BioSection bio={profile.bio} />
      <EducationSection education={profile.education || ''} />
      <SkillsSection skills={profile.skills || []} />

      {/* ✅ Render user's own posts */}
      <PostsSection posts={userPosts} />
    </div>
  );
}

export default Profile;
