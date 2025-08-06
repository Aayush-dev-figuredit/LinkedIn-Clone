import React from "react";
const ProfileHeader = ({ fullName, headline, location }) => {
  return (
    <div className="bg-pink-100 p-4 rounded-xl shadow-sm text-center">
      <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
      <p className="text-sm text-gray-600">{headline}</p>
      <p className="text-xs text-gray-500">{location}</p>
    </div>
  );
};

export default ProfileHeader;
