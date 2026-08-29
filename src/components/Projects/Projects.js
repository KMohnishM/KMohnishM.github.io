import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Imported project images
import awsCloud from "../../Assets/Projects/aws_cloud.png";
import pydebeziumai from "../../Assets/Projects/pydebeziumai.png";
import trademarkiaAi from "../../Assets/Projects/trademarkia_ai.png";
import sals from "../../Assets/Projects/sals.png";
import healthcareAnalytics from "../../Assets/Projects/healthcare_analytics.png";
import learnsqlAi from "../../Assets/Projects/learnsql_ai.png";
import codingPlatform from "../../Assets/Projects/coding_platform.png";
import redditMarketing from "../../Assets/Projects/reddit_marketing.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Endeavors </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are the premium projects and systems I have engineered:
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={awsCloud}
              isBlog={false}
              title={<><span className="purple">AWS Cloud</span> Network Monitor</>}
              description="A cloud-based network traffic monitoring and anomaly detection system for healthcare infrastructure. Simulated vital medical signals (SpO2, heart rate, ECG) are streamed via Flask, scraped by Prometheus, and visualized via Grafana dashboards on AWS EC2, with Alertmanager rules for critical health conditions."
              ghLink="https://github.com/KMohnishM/AWS_Cloud"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pydebeziumai}
              isBlog={false}
              title={<><span className="purple">pydebeziumai</span> – Real-time RAG Sync</>}
              description="A real-time Change Data Capture (CDC) integration library that bridges Debezium change streams with LangChain and LangGraph vector stores (Chroma, PGVector, Milvus) for live RAG synchronization. Eliminates vector database staleness by streaming relational updates instantly."
              ghLink="http://github.com/debezium/debezium-ai-python/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={trademarkiaAi}
              isBlog={false}
              title={<><span className="purple">TradeMarkia AI</span> Semantic Search</>}
              description="An intelligent search system featuring fuzzy clustering with Gaussian Mixture Models (GMM), a custom semantic cache, and a FastAPI service. Processes text datasets using sentence-transformers for embeddings and ChromaDB for vector storage to deliver context-aware retrieval."
              ghLink="https://github.com/KMohnishM/TradeMarkia_AIProject"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sals}
              isBlog={false}
              title={<><span className="purple">SALS</span> – Smart Adaptive Learning</>}
              description="A personalized learning platform that adapts in real-time to students' strengths and weaknesses using diagnostic quizzes, performance analytics, and tailored content flows. Built with Django, React, LangChain, and OpenRouter for dynamic question generation."
              ghLink="https://github.com/KMohnishM/SALS"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={healthcareAnalytics}
              isBlog={false}
              title={<><span className="purple">Healthcare</span> Multimodal ML</>}
              description="A multimodal machine learning system that predicts 30-day heart failure readmission risk using EHR, ECG, and CXR. Implements late and early fusion models designed to remain robust and accurate even when certain modalities are missing at inference."
              ghLink="https://github.com/KMohnishM/HealthCare_Analytics"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={learnsqlAi}
              isBlog={false}
              title={<><span className="purple">LearnSQL.ai</span> – Interactive Tutor</>}
              description="An AI-powered interactive SQL learning platform with practice modules, chatbot assistance, and dynamic analytics. Leverages FastAPI, React, PostgreSQL, and Gemini 2.0 Flash via OpenRouter for instant query evaluation and custom tutoring."
              ghLink="https://github.com/KMohnishM/LearnSQL.ai"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={codingPlatform}
              isBlog={false}
              title={<><span className="purple">Coding Platform</span> – AI Competitive Coding</>}
              description="A full-stack AI-powered competitive coding platform with hint system, code execution, community, and analytics. Built with Django, React, Vite, Tailwind CSS, PostgreSQL, Monaco Editor, and LangChain for adaptive problem-solving and AI-guided hints."
              ghLink="https://github.com/KMohnishM/Coding_Platform"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={redditMarketing}
              isBlog={false}
              title={<><span className="purple">AI Reddit</span> Marketing Assistant</>}
              description="An AI-powered Reddit opportunity discovery and engagement assistant. Scans relevant subreddits asynchronously using Celery, Redis, and PRAW, then leverages LLMs to score threads and draft authentic replies matching a persona."
              ghLink="https://github.com/KMohnishM/Reddit_Marketing_Tool"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
