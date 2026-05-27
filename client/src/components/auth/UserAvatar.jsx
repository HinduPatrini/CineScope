import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserAvatar = ({ onClick }) => {
  const { user } = useAuth();

  if (!user) return null;

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold border-2 border-transparent hover:border-white transition duration-200 cursor-pointer shadow-lg active:scale-95 text-base shrink-0"
      title={`Logged in as ${user.name}`}
    >
      {firstLetter}
    </button>
  );
};

export default UserAvatar;
