import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('用简单的术语解释量子计算。');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse('');
    const result = await generateText(prompt);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">文本生成</h2>
      <p className="text-gray-400 mb-6">输入提示词，让 Gemini 生成详细的文本回复。这里演示了模型核心的文本生成能力。</p>
      
      <div className="flex-grow flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="在此输入您的提示词..."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
          rows={4}
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full sm:w-auto self-end px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '生成中...' : '生成'}
        </button>

        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg min-h-[200px] flex-grow whitespace-pre-wrap text-gray-300">
          {isLoading ? <LoadingSpinner /> : response}
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;