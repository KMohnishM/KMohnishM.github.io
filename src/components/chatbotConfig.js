import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './BotAvatar';

const config = {
  botName: "MohnishBot",
  initialMessages: [
    createChatBotMessage("👋 Hi! I'm Mohnish's AI assistant. Ask me about his projects, skills, or how to contact him!"),
  ],
  placeholderText: "Type your message...",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  customStyles: {
    // These styles are now mostly managed in Chatbot.css for the crystal/glass effect
    botMessageBox: {
      backgroundColor: "transparent", // Let CSS handle it
    },
    chatButton: {
      backgroundColor: "transparent", // Let CSS handle it
    },
    chatWindow: {
      backgroundColor: "transparent", // Let CSS handle it
    },
  },
};

export default config;