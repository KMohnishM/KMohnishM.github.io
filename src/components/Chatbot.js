import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';
import config from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

function ChatbotComponent() {
  // Initialize state from localStorage to persist across page loads
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem('chatbotIsOpen');
    return savedState !== null ? JSON.parse(savedState) : false;
  });
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chatbotIsOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (isOpen) {
      // Initial scroll to bottom
      const scrollToBottom = () => {
        const messageContainer = document.querySelector('.react-chatbot-kit-chat-message-container');
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      };
      
      // Set a slight delay to ensure initial messages are rendered
      setTimeout(scrollToBottom, 100);
      
      // Set up a mutation observer to detect when new messages are added
      const messageContainer = document.querySelector('.react-chatbot-kit-chat-message-container');
      if (messageContainer) {
        const observer = new MutationObserver(scrollToBottom);
        observer.observe(messageContainer, { childList: true, subtree: true });
        
        // Clean up observer on component unmount
        return () => observer.disconnect();
      }
    }
  }, [isOpen]);

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