import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat as GeminiChat } from "@google/genai";
import type { Message } from '../types';
import MessageBox from './MessageBox';
import LoadingSpinner from './LoadingSpinner';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<GeminiChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("API_KEY environment variable not set");
        return;
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: '你是一个乐于助人且友好的人工智能助手。',
        },
    });
    
    setMessages([{ role: 'model', content: "您好！今天我能为您做些什么？" }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await chatRef.current.sendMessage({ message: input });
        const modelMessage: Message = { role: 'model', content: response.text };
        setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = { role: 'model', content: "抱歉，我遇到了一个错误。请重试。" };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">聊天助手</h2>
      <p className="text-gray-400 mb-6">与 Gemini 进行对话。模型会记住之前的对话内容。</p>
      
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 mb-4">
        {messages.map((msg, index) => (
          <MessageBox key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-md px-4 py-3 rounded-2xl bg-gray-600 text-gray-200 rounded-bl-none">
              <LoadingSpinner size="h-5 w-5"/>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入您的消息..."
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default Chat;