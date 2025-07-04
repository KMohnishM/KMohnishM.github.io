import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Endeavors </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few developments I've been working on
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title={<span className="purple">HintGen</span> + " – Contextual LLM Hint Generator"}
              description={"Built a system that gives smart, helpful hints to students stuck while solving coding problems. Instead of showing the answer, it understands what the student is trying to do by analyzing their code, the problem, and past attempts. Then, it uses AI (" + <span className="purple">LLMs</span> + ") to generate hints that guide them step-by-step in the right direction. The system also checks each hint to make sure it's safe, useful, and actually helps the student learn and make progress."}
              ghLink="#"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title={<span className="purple">SALS</span> + " – Smart Adaptive Learning System"}
              description={"Built a personalized learning platform that adapts in real-time to students' strengths and weaknesses using diagnostic quizzes, performance analytics, and tailored content flows. Leveraged " + <span className="purple">Django</span> + ", " + <span className="purple">React</span> + ", " + <span className="purple">LangChain</span> + ", and " + <span className="purple">OpenRouter</span> + " to integrate " + <span className="purple">LLMs</span> + " for generating adaptive questions, resources, and evaluation pipelines. Aimed to enhance engagement, mastery learning, and intelligent tutoring through scalable, modular architecture."}
              ghLink="#"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title={<span className="purple">SoilClassification</span> + " – AI-based Soil Image Classifier"}
              description={"Developed a soil type classifier using a pre-trained " + <span className="purple">Vision Transformer (ViT)</span> + " for the Annam AI Hackathon 2025. The pipeline included data preprocessing, class imbalance handling, and image feature extraction using Hugging Face's " + <span className="purple">ViTModel</span> + ". Trained a lightweight Keras classifier on ViT embeddings and evaluated with precision, recall, and F1-score. Emphasized modularity, EDA, and interpretability through Grad-CAM and class distribution analysis."}
              ghLink="#"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title={<span className="purple">CN Project</span> + " – Cloud-Based Network Monitoring"}
              description={"Engineered a real-time network monitoring and anomaly detection system tailored for cloud-hosted hospital infrastructures. Simulated vital signals (SpO2, heart rate, ECG) and streamed metrics via " + <span className="purple">Flask</span> + ", exposing them to " + <span className="purple">Prometheus</span> + " for scraping. Deployed using " + <span className="purple">Docker</span> + " on " + <span className="purple">AWS EC2</span> + ", with " + <span className="purple">Grafana</span> + " dashboards and Alertmanager rules for critical health conditions like hypoxia."}
              ghLink="#"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title={<span className="purple">OS Data Analysis Tool</span> + " – Dynamic CPU Scheduler & Monitor"}
              description={"Developed a real-time CPU scheduling and monitoring tool in " + <span className="purple">C</span> + " using ncurses, combining a tree-based priority scheduler with Round Robin logic. The system dynamically adjusts time quantum, maintaining utilization below 80%. It features an interactive terminal UI that visualizes CPU usage, memory stats, and process states, providing hands-on insight into adaptive scheduling under varying workloads."}
              ghLink="#"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
