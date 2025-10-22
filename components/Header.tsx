import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Deli Studio AI
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        一个拥有 Gemini 能力的AI应用。
      </p>
    </header>
  );
};

export default Header;