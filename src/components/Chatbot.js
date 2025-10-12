import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';
import config from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-wrapper">
          <button className="chatbot-close-btn" onClick={toggleChatbot}>
            X
          </button>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText=" Chat with Mohnish's AI "
          />
        </div>
      ) : (
        <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
          <span className="toggle-icon">M</span>
        </button>
      )}
    </div>
  );
}

export default ChatbotComponent;