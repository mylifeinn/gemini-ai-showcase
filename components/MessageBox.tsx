
import React from 'react';
import type { Message } from '../types';

interface MessageBoxProps {
  message: Message;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-purple-600 text-white rounded-br-none'
            : 'bg-gray-600 text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageBox;
