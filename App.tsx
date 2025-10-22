import React, { useState } from 'react';
import Header from './components/Header';
import TabButton from './components/TabButton';
import TextGenerator from './components/TextGenerator';
import ImageGenerator from './components/ImageGenerator';
import Chat from './components/Chat';
import SearchGrounding from './components/SearchGrounding';

type Demo = 'text' | 'image' | 'chat' | 'search';

const App: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<Demo>('text');

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'text':
        return <TextGenerator />;
      case 'image':
        return <ImageGenerator />;
      case 'chat':
        return <Chat />;
      case 'search':
        return <SearchGrounding />;
      default:
        return <TextGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <div className="mb-8 p-1 bg-gray-800 rounded-lg flex justify-center space-x-1 sm:space-x-2">
          <TabButton
            label="文本生成"
            isActive={activeDemo === 'text'}
            onClick={() => setActiveDemo('text')}
          />
          <TabButton
            label="图像生成"
            isActive={activeDemo === 'image'}
            onClick={() => setActiveDemo('image')}
          />
          <TabButton
            label="聊天"
            isActive={activeDemo === 'chat'}
            onClick={() => setActiveDemo('chat')}
          />
          <TabButton
            label="网络搜索"
            isActive={activeDemo === 'search'}
            onClick={() => setActiveDemo('search')}
          />
        </div>
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 min-h-[600px]">
          {renderActiveDemo()}
        </div>
        <footer className="text-center text-gray-500 mt-8">
            <p>Powered by Gemini | delistudio.top</p>
        </footer>
      </main>
    </div>
  );
};

export default App;