import React from 'react';

export const Sidebar = ({ children, title }) => {
  return (
    <aside className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-full max-h-[600px] lg:max-h-none overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 sticky top-0 bg-white pb-2">
        {title}
      </h2>
      {children}
    </aside>
  );
};
