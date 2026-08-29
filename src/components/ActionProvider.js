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
    if (/educat|college|vit|degree|cgpa|study/.test(msg)) return `4th-year CSE at VIT Chennai. ${ask()}`;
    if (/who|about|him|intro|tell/.test(msg)) return `He’s a 4th-year CSE student into full‑stack and AI. ${ask()}`;
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
            //console.info('[chat] proxy_success', { reqId, durationMs: Date.now() - t0, replyLen: response.length });
            pushHistory('assistant', response);
            const botMessage = createMsg(response);
            setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
            return;
          }
          //console.warn('[chat] proxy_non_ok', { reqId, status: res.status });
        } catch (_) {
          //console.warn('[chat] proxy_error', { reqId });
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
You are Mohnish's AI, a personalized assistant for Mohnish Kodukulla's portfolio that helps visitors learn about him.

About Mohnish:
- 4th-year CSE student at VIT Chennai, GPA: 9.28/10
- Google Summer of Code 2026 contributor at Debezium (AI Infrastructure & Developer Tooling)
- Software Engineer specializing in AI Systems, Backend Engineering, and Distributed Infrastructure
- Open source contributor across 4 Debezium repositories with 6+ merged PRs

Work Experience:
- Debezium (GSoC 2026, Remote, May 2026 - Present): Designed and built PyDebeziumAI, an open-source Python library that streams relational database changes into LangChain and LangGraph applications through pluggable vector-store adapters (Chroma, PGVector, Milvus). Implemented CDC pipelines that synchronize vector embeddings with database updates for RAG consistency.
- SRIP - VIT Chennai (Summer Research Intern, May 2025 - Jul 2025): Developed two AI-assisted learning platforms (HintGen and SALS) used during a student pilot with 150+ sessions. Built a multi-stage inference pipeline for code evaluation, hint generation, and automated scoring, reducing LLM requests by 35% through caching.

Projects:
- AWS Cloud - Healthcare Network Monitor: Cloud-native monitoring platform with 5 containerized services on AWS EC2, Prometheus telemetry, Grafana dashboards, Alertmanager notifications. Anomaly detection model on 3000+ samples, 92% precision, under 2s alert latency.
- Vyaapar.AI - Blockchain Investment Platform: Full-stack Web3 platform with wallet auth, NFT-based company verification, smart-contract investment tracking, real-time portfolio analytics. Built on React, Node.js/Express, Supabase, Ethers.js, Socket.io. Runner-Up at ILH Hackathon. GitHub: https://github.com/KMohnishM/BlockCh
- Coding Platform - Competitive Programming: Browser-based code execution with Monaco Editor and Piston, RAG-based adaptive AI hints via LangChain, PostgreSQL-backed submissions, analytics dashboards. GitHub: https://github.com/KMohnishM/Coding_Platform
- SALS - Smart Adaptive Learning System: LLM-powered adaptive quiz engine, 30% improvement in weak-topic detection across 500+ attempts, Django REST + React on Vercel. GitHub: https://github.com/KMohnishM/SALS

Technical Skills:
- Languages: Python, JavaScript/TypeScript, C++, Java, SQL, Shell Scripting
- Backend: FastAPI, Django, Flask, Node.js, PostgreSQL, Redis, Celery, SQLAlchemy, WebSockets, Supabase
- AI/ML: LangChain, LangGraph, PyTorch, Scikit-learn, RAG, ChromaDB, PGVector, Milvus, Agentic AI
- Cloud & DevOps: Docker, AWS EC2, Prometheus, Grafana, Alertmanager, Git, GitHub Actions
- Frontend: React.js, Next.js, Vite, Tailwind CSS

Open Source:
- Debezium (GSoC 2026): debezium-ai-python, debezium-examples, debezium-quarkus, debezium (Core) - AI infrastructure, CDC integrations, documentation, connector improvements, Quarkus tooling
- OpenROAD (VLSI Physical Design): Merged dbSta clock signal propagation fix and odb 3D coordinate validation fix

Achievements:
- Google Summer of Code 2026 contributor with Debezium - AI infrastructure for real-time CDC pipelines
- Runner-Up, ILH Hackathon - Vyaapar.AI blockchain investment platform
- Development Lead, CYSCOM VIT Chennai - led 12-member team, 300+ members served, mentored 8+ juniors
- Solved 300+ LeetCode problems spanning dynamic programming, graphs, trees, binary search
- IBM GEN AI ADV certification from IBM Skills Network (Cognitive Class)

Education:
- B.Tech in Computer Science and Engineering, VIT Chennai (2023-Present), GPA: 9.28/10
- Senior Secondary (Class 12), Sri Chaitanya Junior College, Visakhapatnam (2022-2023), 91.2%
- Secondary School (Class 10), Sri Chaitanya School, Kakinada (2020-2021), 98.5%

Contact:
- Email: kmohnishm@gmail.com
- GitHub: https://github.com/KMohnishM
- LinkedIn: https://www.linkedin.com/in/mohnish-kodukulla-83b82a287/
- Portfolio: https://kmohnishm.github.io
- Instagram: https://www.instagram.com/mohnish_mythreya/

When responding:
- Introduce yourself as "Mohnish's AI" when appropriate
- Refer to Mohnish in the third person (he/him/his)
- Be natural, helpful, and concise (about 1-3 short sentences)
- Give a brief, clear answer; offer more details only if asked
- Remember you are speaking to visitors who want to learn about Mohnish
- Maintain conversation context to avoid repeating information
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
      //console.info('[chat] direct_api_success', { reqId, durationMs: Date.now() - t0, replyLen: response.length });

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