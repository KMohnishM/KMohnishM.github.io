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
    const proxyUrl = process.env.REACT_APP_GEMINI_PROXY_URL;
    const reqId = Math.random().toString(36).slice(2);
    const t0 = Date.now();

    try {
      // Record the user's message in history first
      pushHistory('user', message);

      // Build a concise conversation context string
      let conversationContext = '';
      if (historyRef.current.length > 1) {
        conversationContext = '\n\nConversation so far:\n';
        const startIdx = Math.max(0, historyRef.current.length - 6);
        for (let i = startIdx; i < historyRef.current.length; i++) {
          const entry = historyRef.current[i];
          conversationContext += `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.text}\n`;
        }
      }

      // If a secure proxy is configured, prefer sending the request there
      if (proxyUrl) {
        try {
          console.info('[chat] proxy_request', { reqId, url: proxyUrl, messageLen: message?.length || 0, historyLen: historyRef.current.length });
          const res = await fetch(proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history: historyRef.current })
          });
          if (res.ok) {
            const data = await res.json();
            let response = data.reply || data.text || data.message || '';
            if (!response || typeof response !== 'string' || response.trim().length === 0) {
              response = generateFallbackResponse(message);
            }
            if (response && response.length > 1200) {
              response = response.slice(0, 1100) + '...';
            }
            console.info('[chat] proxy_success', { reqId, durationMs: Date.now() - t0, replyLen: response.length });
            pushHistory('assistant', response);
            const botMessage = createMsg(response);
            setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
            return;
          }
          console.warn('[chat] proxy_non_ok', { reqId, status: res.status });
        } catch (_) {
          console.warn('[chat] proxy_error', { reqId });
          // If proxy call fails, continue to direct API or fallback
        }
      }

      // If no API key available, use fallback
      if (!apiKey || !genAI) {
        console.info('[chat] fallback_no_api', { reqId, durationMs: Date.now() - t0 });
        const fallback = generateFallbackResponse(message);
        pushHistory('assistant', fallback);
        const botMessage = createMsg(fallback);
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
        return;
      }

      // Light connectivity check (non-blocking)
  try { await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`); } catch (_) {}
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

      // Friendly, natural system prompt
      const systemPrompt = `
You are the friendly portfolio assistant for Mohnish Kodukulla.
Be natural, helpful, and concise (about 1–3 short sentences).
Give a brief, clear answer first. If the question is broad (e.g., "tell about him"),
share a quick overview and offer to provide more details on request.
Use prior messages as context to avoid repeating info.
You can mention projects, skills, education, or contact when relevant.
Tone: warm, professional, and human—no rigid rules or bullet spam.
`;

      const prompt = systemPrompt +
        (conversationContext ? `${conversationContext}` : '') +
        '\n\nUser: ' + message + '\nAssistant:';

      const result = await model.generateContent(prompt);
      let response = result.response?.text ? result.response.text() : '';
      if (!response || typeof response !== 'string' || response.trim().length === 0) {
        response = generateFallbackResponse(message);
      }
      // Soft safety trim for very long generations
      if (response && response.length > 1200) {
        response = response.slice(0, 1100) + '...';
      }
      console.info('[chat] direct_api_success', { reqId, durationMs: Date.now() - t0, replyLen: response.length });

      pushHistory('assistant', response);
      const botMessage = createMsg(response);
      setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
    } catch (error) {
      console.error('[chat] direct_api_error', { reqId, durationMs: Date.now() - t0, message: (error && error.message) || String(error) });
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