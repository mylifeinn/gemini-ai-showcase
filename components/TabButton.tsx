
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const baseClasses = 'w-full px-3 py-2 text-sm sm:text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors duration-200';
  const activeClasses = 'bg-purple-600 text-white shadow-md';
  const inactiveClasses = 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
