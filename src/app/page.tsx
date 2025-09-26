'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  content: string;
  isLink?: boolean;
  links?: Array<{ text: string; url: string; }>;
}

const messages: Message[] = [
  { id: 1, content: 'Hey there 👋' },
  { id: 2, content: "I'm Sebastian" },
  { id: 3, content: 'I design and code things' },
  {
    id: 4,
    content: "I'm currently looking for work"
  },
  {
    id: 5,
    content: 'You can contact me on +4745234240, Mail, LinkedIn',
    isLink: true,
    links: [
      { text: '+4745234240', url: 'tel:+4745234240' },
      { text: 'Mail', url: 'mailto:sebb.male.larsen@gmail.com' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/sebmale' }
    ]
  }
];

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 p-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 z-50 shadow-lg hover:shadow-xl"
      style={{
        backgroundColor: isDark ? '#343434' : '#dcdcdc',
        color: isDark ? '#dedede' : '#1d1d1d',
        border: isDark ? '1px solid #565656' : '1px solid #c4c4c4',
        willChange: 'transform, box-shadow',
        backfaceVisibility: 'hidden'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="transition-transform duration-300 ease-out" style={{ willChange: 'transform' }}>
        {isDark ? (
          // Sun icon for switching to light mode
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ willChange: 'transform' }}
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Moon icon for switching to dark mode
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ willChange: 'transform' }}
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
};

const TypingIndicator = ({ visible, isDark }: { visible: boolean; isDark: boolean }) => {
  const dotColor = '#7c7c7c';

  return (
    <div className={`flex space-x-1 transition-opacity duration-300 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: dotColor,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          animation: visible ? 'dotPulse1 1.4s ease-in-out infinite' : 'none'
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: dotColor,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          animation: visible ? 'dotPulse2 1.4s ease-in-out infinite' : 'none'
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: dotColor,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          animation: visible ? 'dotPulse3 1.4s ease-in-out infinite' : 'none'
        }}
      />
    </div>
  );
};

const ChatBubble = ({ message, visible, showTyping, isDark }: {
  message: Message;
  visible: boolean;
  showTyping: boolean;
  isDark: boolean;
}) => {
  const colors = isDark ? {
    background: '#1c1c1c',
    text: '#dedede',
    linkColor: '#60a5fa'
  } : {
    background: '#dcdcdc',
    text: '#1d1d1d',
    linkColor: '#2563eb'
  };

  const renderContent = () => {
    if (!message.isLink || !message.links) {
      return message.content;
    }

    let content = message.content;
    message.links.forEach(link => {
      content = content.replace(
        link.text,
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 transition-opacity duration-200" style="color: ${colors.linkColor}; font-weight: 500;">${link.text}</a>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div
      className={`
        inline-block max-w-fit
        px-5 py-3 rounded-3xl mb-2
        transition-all duration-500 ease-out
        text-sm leading-relaxed font-medium
      `}
      style={{
        background: colors.background,
        color: colors.text,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        opacity: visible ? 1 : 0,
        transform: visible
          ? (showTyping ? 'scale(0.98) translate3d(0,0,0)' : 'scale(1) translate3d(0,0,0)')
          : 'scale(0.9) translate3d(0,0,0)',
        animation: showTyping ? 'bubbleBreath 2s ease-in-out infinite' : 'none'
      }}
    >
      <div className="relative min-h-[1.5rem]">
        {showTyping && (
          <div className="flex items-center justify-center h-6">
            <TypingIndicator visible={showTyping} isDark={isDark} />
          </div>
        )}
        <div
          className={`transition-all duration-300 ease-out ${!showTyping ? 'block' : 'hidden'}`}
          style={{ willChange: 'opacity, transform' }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isDark, setIsDark] = useState(true); // Default to dark like original
  const [mounted, setMounted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingStates, setTypingStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setMounted(true);
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const showMessagesSequentially = async () => {
      for (let i = 0; i < messages.length; i++) {
        const messageId = messages[i].id;

        // Show bubble first with scaling animation
        setVisibleMessages(prev => [...prev, messageId]);

        // Small delay before showing typing indicator
        await new Promise(resolve => setTimeout(resolve, 150));

        // Show typing indicator
        setTypingStates(prev => ({ ...prev, [messageId]: true }));

        // Natural typing duration like original - more varied
        const typingDuration = 1200 + Math.random() * 800;
        await new Promise(resolve => setTimeout(resolve, typingDuration));

        // Hide typing indicator and show message
        setTypingStates(prev => ({ ...prev, [messageId]: false }));

        // Natural pause between messages like original
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
      }
    };

    // Start immediately like original
    const timer = setTimeout(showMessagesSequentially, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
        <div className="flex items-start justify-start p-6 md:p-12">
          <div className="w-full max-w-2xl">
            <div className="flex flex-col space-y-0">
              {/* Loading state */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-start justify-start p-6 md:p-12 transition-colors duration-300 relative"
      style={{
        backgroundColor: isDark ? '#000000' : '#f9f9f9',
        willChange: 'background-color',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        transform: 'translate3d(0,0,0)'
      }}
    >
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="w-full max-w-2xl" style={{ willChange: 'transform' }}>
        <div className="flex flex-col space-y-0">
          {messages.map((message) => (
            <div key={message.id} className="flex justify-start">
              <ChatBubble
                message={message}
                visible={visibleMessages.includes(message.id)}
                showTyping={typingStates[message.id] || false}
                isDark={isDark}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
