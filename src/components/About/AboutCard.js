import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I am <span className="purple">Mohnish Kodukulla</span>, a 3rd-year CSE student at <span className="purple">VIT Chennai</span> (CGPA: <span className="purple">9.31/10</span>).
            <br />
            I am passionate about <span className="purple">Full-Stack Development</span>, <span className="purple">Cloud Infrastructure</span>, and <span className="purple">AI-driven systems</span>.
            <br />
            Experienced with <span className="purple">MERN stack</span>, <span className="purple">Next.js</span>, <span className="purple">Redis</span>, <span className="purple">Docker</span>, <span className="purple">Prometheus</span>, <span className="purple">Grafana</span>, <span className="purple">Generative AI</span>, and <span className="purple">LLM-based workflows</span>.
            <br />
            I enjoy building at the intersection of <span className="purple">systems engineering</span> and <span className="purple">AI</span>, and thrive in fast-paced, exploratory environments.
            <br />
            <br />
            <strong className="purple">Education:</strong>
            <ul>
              <li><span className="purple">B.Tech in Computer Science and Engineering</span>, <span className="purple">VIT Chennai</span> (2023–Present)</li>
              <li><span className="purple">Senior Secondary (Class 12)</span>, Sri Chaitanya Junior College, Visakhapatnam (2022–2023), <span className="purple">91.2%</span></li>
              <li><span className="purple">Secondary School (Class 10)</span>, Sri Chaitanya School, Kakinada (2020–2021), <span className="purple">98.5%</span></li>
            </ul>
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Watching Cricket
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Books
            </li>
            <li className="about-activity">
              <ImPointRight /> Listening Music
            </li>
          </ul>

          <p style={{ color: "violet" }}>
            "Displicine and continous Effort can only make the difference"{" "}
          </p>
          <footer className="blockquote-footer">Mohinsh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
