import React, { useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Functional ActionProvider compatible with react-chatbot-kit v2
export default function ActionProvider({ createChatBotMessage: createMsg, setState, children }) {
  const historyRef = useRef([]);

  const pushHistory = (role, text) => {
    historyRef.current.push({ role, text });
    if (historyRef.current.length > 6) {
      historyRef.current = historyRef.current.slice(-6);
    }
  };

  const generateFallbackResponse = (userMsg) => {
    const msg = (userMsg || '').toLowerCase();
    const ask = () => {
      const options = [
        'Want projects or skills next?',
        'Curious about his projects?',
        'Interested in skills or education?',
        'Want contact or resume link?',
        'Which part should I expand?'
      ];
      return options[Math.floor(Math.random() * options.length)];
    };
    if (/contact|email|reach|linkedin|connect/.test(msg)) return `I can share his contact or LinkedIn if you want. ${ask()}`;
    if (/resume|cv/.test(msg)) return `I can share his resume link on request. ${ask()}`;
    if (/project|work|built|portfolio/.test(msg)) {
      const one = ['HintGen', 'SALS', 'SoilClassification', 'CN Project', 'OS Tool'][Math.floor(Math.random() * 5)];
      return `${one}: brief overview only on request. ${ask()}`;
    }
    if (/skill|stack|tech|tools|technology/.test(msg)) return `He works with MERN and cloud. ${ask()}`;
    if (/educat|college|vit|degree|cgpa|study/.test(msg)) return `3rd-year CSE at VIT Chennai. ${ask()}`;
    if (/who|about|him|intro|tell/.test(msg)) return `He’s a 3rd-year CSE student into full‑stack and AI. ${ask()}`;
    return `Got it. I’ll keep answers brief. ${ask()}`;
  };

  const handleGeminiResponse = async (message) => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

    try {
      if (!apiKey || !genAI) {
        const fallback = generateFallbackResponse(message);
        pushHistory('assistant', fallback);
        const botMessage = createMsg(fallback);
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
        return;
      }

      try { await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`); } catch (_) {}
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

      pushHistory('user', message);

      const systemPrompt = `
You are a conversational assistant for Mohnish Kodukulla's portfolio website. Follow these MANDATORY guidelines:

1. NEVER provide comprehensive answers. Keep responses to 15 words or less.
2. When asked about Mohnish's background, only mention ONE detail (education OR skills OR projects).
3. ALWAYS end with a short follow-up question - this is REQUIRED.
4. NEVER list multiple projects, skills, or details in one response.
5. Information should be revealed gradually over multiple exchanges.
6. MAINTAIN CONTEXT from previous messages in the conversation.

Basic Facts (choose only ONE when asked about Mohnish):
- 3rd-year CSE student at VIT Chennai 
- Focused on Full-Stack development
- Works with MERN stack and cloud technologies
- Interested in AI development

Projects (mention only ONE project name with minimal description):
- HintGen: AI-based learning assistance
- SALS: Adaptive learning platform
- SoilClassification: AI soil analysis
- CN Project: Hospital network monitoring
- OS Tool: CPU scheduling visualization

Mandatory Follow-up Questions (ALWAYS include one):
- "Would you like to know about his projects?"
- "Curious about his technical skills?"
- "Interested in his education details?"
- "Want to know how to contact him?"
- "Which aspect interests you most?"

Contact: Only provide contact details if specifically asked.
Resume: Only share link if specifically requested.
`;

      let conversationContext = '';
      if (historyRef.current.length > 1) {
        conversationContext = '\n\nConversation History:\n';
        const startIdx = Math.max(0, historyRef.current.length - 6);
        for (let i = startIdx; i < historyRef.current.length; i++) {
          const entry = historyRef.current[i];
          conversationContext += `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.text}\n`;
        }
      }

      const prompt = systemPrompt + 
      `\n\n⚠️ MANDATORY RULES - VIOLATION NOT PERMITTED ⚠️
      1. Response MUST be 15 words maximum - NO EXCEPTIONS
      2. ALWAYS end with a question - REQUIRED
      3. When asked about Mohnish, give ONE fact only
      4. NEVER provide comprehensive descriptions
      5. Response format: Brief statement + follow-up question
      6. Consider the conversation history for context` +
      conversationContext +
      '\n\nUser (current message): ' + message;

      const result = await model.generateContent(prompt);
      let response = result.response?.text ? result.response.text() : '';
      if (!response || typeof response !== 'string' || response.trim().length === 0) {
        response = generateFallbackResponse(message);
      }
      if (response.split(' ').length > 30) {
        response = response.split('.')[0] + '? Would you like to know more?';
      }
      if (!response.includes('?')) {
        response += ' What would you like to know about him?';
      }

      pushHistory('assistant', response);
      const botMessage = createMsg(response);
      setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
    } catch (error) {
      const fallback = generateFallbackResponse(message);
      const errorMessage = createMsg(fallback);
      setState((prev) => ({ ...prev, messages: [...prev.messages, errorMessage] }));
      pushHistory('assistant', fallback);
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      actions: {
        handleGeminiResponse,
      },
    })
  );
}