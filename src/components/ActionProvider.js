import { createChatBotMessage } from 'react-chatbot-kit';
import { GoogleGenerativeAI } from '@google/generative-ai';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleGeminiResponse = async (message) => {
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY); // You'll need to set this in .env

    try {
      // Get model access
      await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.REACT_APP_GEMINI_API_KEY}`);

      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

      const systemPrompt = `
You are a helpful assistant for Mohnish Kodukulla's portfolio website. Answer questions based on the following information about Mohnish:

Bio: Hi, I am Mohnish Kodukulla, a 3rd-year CSE student at VIT Chennai (CGPA: 9.31/10). I am passionate about Full-Stack Development, Cloud Infrastructure, and AI-driven systems. Experienced with MERN stack, Next.js, Redis, Docker, Prometheus, Grafana, Generative AI, and LLM-based workflows. I enjoy building at the intersection of systems engineering and AI, and thrive in fast-paced, exploratory environments.

Education:
- B.Tech in Computer Science and Engineering, VIT Chennai (2023–Present)
- Senior Secondary (Class 12), Sri Chaitanya Junior College, Visakhapatnam (2022–2023), 91.2%
- Secondary School (Class 10), Sri Chaitanya School, Kakinada (2020–2021), 98.5%

Hobbies: Watching Cricket, Reading Books, Listening Music

Projects:
1. HintGen – Contextual LLM Hint Generator: Built a system that gives smart, helpful hints to students stuck while solving coding problems. Uses AI (LLMs) to generate hints that guide them step-by-step. Checks hints for safety and usefulness.
2. SALS – Smart Adaptive Learning System: Personalized learning platform that adapts to students' strengths using Django, React, LangChain, OpenRouter, LLMs for adaptive questions and resources.
3. SoilClassification – AI-based Soil Image Classifier: Uses Vision Transformer (ViT) for Annam AI Hackathon 2025. Includes data preprocessing, Keras classifier, evaluation metrics.
4. CN Project – Cloud-Based Network Monitoring: Real-time network monitoring for hospital infrastructures using Flask, Prometheus, Docker, AWS EC2, Grafana, Alertmanager.
5. OS Data Analysis Tool – Dynamic CPU Scheduler & Monitor: CPU scheduling tool in C using ncurses, tree-based priority scheduler with Round Robin.

Contact: GitHub: https://github.com/KMohnishM, LinkedIn: https://www.linkedin.com/in/mohnish-kodukulla-83b82a287/, Instagram: https://www.instagram.com/mohnish_mythreya/

Resume Summary: Mohnish Kodukulla is a 3rd-year CSE student at VIT Chennai with a CGPA of 9.31/10. He specializes in Full-Stack Development, Cloud Infrastructure, and AI-driven systems. Technologies: MERN stack, Next.js, Redis, Docker, Prometheus, Grafana, Generative AI, LLM-based workflows. Key projects: HintGen (contextual LLM hint generator), SALS (smart adaptive learning system), SoilClassification (AI soil image classifier), CN Project (cloud-based network monitoring), OS Data Analysis Tool (dynamic CPU scheduler). Download resume: https://kmohnishm.github.io/CV_upd.pdf

Keep responses friendly, concise, and relevant. If asked something not covered, suggest contacting Mohnish directly.
`;

      const result = await model.generateContent(systemPrompt + '\nUser: ' + message);
      const response = result.response.text();
      const botMessage = createChatBotMessage(response);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      const errorMessage = createChatBotMessage("Sorry, I'm having trouble responding right now. Please try again later or contact Mohnish directly.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
}

export default ActionProvider;