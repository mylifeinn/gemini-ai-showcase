import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('一张宇航员在火星上骑马的照片');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setImageUrl(null);
    setError('');
    try {
      const resultUrl = await generateImage(prompt);
      setImageUrl(resultUrl);
    } catch (err: any) {
      setError("图像生成失败。这可能是因为您使用的API密钥权限不足或模型不可用。请稍后再试或检查您的API设置。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">图像生成</h2>
      <p className="text-gray-400 mb-6">描述一幅图像，Gemini 将把它变为现实。此功能使用 Imagen 模型进行高质量图像合成。</p>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="在此输入您的图像描述..."
              className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '生成中...' : '生成'}
            </button>
        </div>

        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg min-h-[300px] flex justify-center items-center">
          {isLoading && <LoadingSpinner size="h-12 w-12" />}
          {error && <p className="text-red-400">{error}</p>}
          {!isLoading && imageUrl && (
            <img src={imageUrl} alt={prompt} className="rounded-md max-w-full max-h-[400px] object-contain" />
          )}
          {!isLoading && !imageUrl && !error && (
            <p className="text-gray-500">您生成的图像将显示在此处。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;