import React from 'react';

// Functional MessageParser for react-chatbot-kit v2
export default function MessageParser({ children, actions }) {
  const parse = (message) => {
    actions.handleGeminiResponse(message);
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      parse,
    })
  );
}