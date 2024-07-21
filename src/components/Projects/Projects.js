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
          Here are a few developments I’ve been working on
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="CodSoft"
              description="This is a Folder of tasks done in my recent internship. Going in detail , It has Tkinter - a user interface of python used in it. The Four Projects are Calculator, Password Generator, Rock Paper Scissor Game, Contact Book. "
              ghLink="https://github.com/KMohnishM/Codsoft_python"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="SnaKe-Ladder : Game"
              description="A Basic version of snake and ladder . It is one of my intial projects in react.js . It is built using react in frontend and flask at the backend. It was start of me learning full stack."
              ghLink="https://github.com/KMohnishM/project"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="JP Morgan Forage Job Sim"
              description="This is my First Job Sim where I learnt a bit of real time experince . This is about Handling JS and Python i.e both Front and Back end "
              ghLink="https://github.com/KMohnishM/forage-jpmc-swe-task-1"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="StartLe"
              description="This is Project of Start of learning of API's . This is a weather-forecast website. It takes city name as input and returns you the Forecast of next week with Current Weather condition."
              ghLink="https://github.com/KMohnishM/starle"
              
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
