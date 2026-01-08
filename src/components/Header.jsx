import React from 'react';
import { useAppStore } from '../store/appStore';

export const Header = () => {
  const { user, regenerateUser } = useAppStore();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Image Reactions</h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 hidden sm:block">
              Real-time image gallery with live interactions
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                style={{ backgroundColor: user.color }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-blue-100">You</p>
              </div>
            </div>

            <button
              onClick={regenerateUser}
              className="
                px-2 py-1.5 sm:px-3 rounded-lg
                bg-blue-500 hover:bg-blue-400
                text-white text-xs font-medium
                transition-colors duration-150
                whitespace-nowrap
              "
              title="Generate a new user identity"
            >
              New User
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
