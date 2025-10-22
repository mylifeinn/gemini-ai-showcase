import React, { useState } from 'react';
import { generateWithSearch } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import type { GroundingSource } from '../types';

const SearchGrounding: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('谁赢得了最近的一级方程式大奖赛？');
  const [response, setResponse] = useState<string>('');
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse('');
    setSources([]);
    const result = await generateWithSearch(prompt);
    setResponse(result.text);
    setSources(result.sources);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">网络搜索</h2>
      <p className="text-gray-400 mb-6">询问有关最近事件的问题。Gemini 将使用 Google 搜索提供包含来源的最新、最真实的答案。</p>
      
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="询问一些最近发生的事情..."
              className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '搜索中...' : '提问'}
            </button>
        </div>

        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg min-h-[200px] flex-grow text-gray-300">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <p className="whitespace-pre-wrap">{response}</p>
              {sources.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">来源：</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {sources.map((source, index) => source.web && (
                      <li key={index}>
                        <a
                          href={source.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 hover:underline"
                        >
                          {source.web.title || source.web.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchGrounding;