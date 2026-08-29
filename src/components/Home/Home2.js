import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/Av.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am <strong className="purple">Mohnish Kodukulla</strong>, a 4th-year CSE student at <span className="purple">VIT Chennai</span> and a <span className="purple">Google Summer of Code 2026</span> contributor at <span className="purple">Debezium</span>, where I build AI infrastructure for real-time change-data-capture pipelines.
              <br />
              <br />
              I design and ship systems at the intersection of <span className="purple">backend engineering</span>, <span className="purple">distributed infrastructure</span>, and <span className="purple">applied AI</span> - from CDC-to-vector-store sync libraries to competitive coding platforms and cloud-native monitoring stacks.
              <br />
              <br />
              My work spans <span className="purple">LangChain</span>, <span className="purple">LangGraph</span>, and <span className="purple">RAG pipelines</span> on the AI side, and <span className="purple">FastAPI</span>, <span className="purple">Django</span>, <span className="purple">PostgreSQL</span>, <span className="purple">Docker</span>, <span className="purple">Prometheus</span>, and <span className="purple">AWS EC2</span> on the infrastructure side.
              <br />
              <br />
              I contribute to open source, solve engineering problems end-to-end, and care deeply about <span className="purple">systems that are observable, reliable, and purposeful</span>.
              <br />
              <br />
              <span>
                Building systems that <strong className="purple">work in production</strong>, not just in demos - one architecture at a time.
              </span>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/KMohnishM"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/mohnish-kodukulla-83b82a287/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/mohnish_mythreya/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
