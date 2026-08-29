import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I am <span className="purple">Mohnish Kodukulla</span>, a 4th-year CSE student at <span className="purple">VIT Chennai</span> (GPA: <span className="purple">9.28/10</span>) and a <span className="purple">Google Summer of Code 2026</span> contributor at <span className="purple">Debezium</span>.
            <br />
            I build systems at the intersection of <span className="purple">backend engineering</span>, <span className="purple">AI infrastructure</span>, and <span className="purple">distributed systems</span> - from open-source CDC pipelines to cloud-native monitoring stacks and adaptive learning platforms.
            <br />
            My stack: <span className="purple">FastAPI</span>, <span className="purple">Django</span>, <span className="purple">LangChain</span>, <span className="purple">LangGraph</span>, <span className="purple">RAG</span>, <span className="purple">Docker</span>, <span className="purple">PostgreSQL</span>, <span className="purple">Prometheus</span>, and <span className="purple">AWS EC2</span>.
            <br />
            I care about open source, observable systems, and engineering that works in production.
            <br />
            <br />
            <strong className="purple">Education:</strong>
            <ul>
              <li><span className="purple">B.Tech in Computer Science and Engineering</span>, <span className="purple">VIT Chennai</span> (2023-Present)</li>
              <li><span className="purple">Senior Secondary (Class 12)</span>, Sri Chaitanya Junior College, Visakhapatnam (2022-2023), <span className="purple">91.2%</span></li>
              <li><span className="purple">Secondary School (Class 10)</span>, Sri Chaitanya School, Kakinada (2020-2021), <span className="purple">98.5%</span></li>
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
            "Discipline and continuous Effort can only make the difference"{" "}
          </p>
          <footer className="blockquote-footer">Mohnish</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
