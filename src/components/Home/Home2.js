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
              I am <strong className="purple">Mohnish Kodukulla</strong>, a 3rd-year CSE student at <span className="purple">VIT Chennai</span>, passionate about <span className="purple">Full-Stack Development</span>, <span className="purple">Cloud Infrastructure</span>, and <span className="purple">AI-driven systems</span>.
              <br />
              <br />
              I have built and deployed end-to-end applications using the <span className="purple">MERN stack</span>, <span className="purple">Next.js</span>, <span className="purple">Redis</span>, and <span className="purple">Docker</span>, and have experience managing real-time systems and monitoring pipelines using <span className="purple">Prometheus</span> and <span className="purple">Grafana</span>.
              <br />
              <br />
              My projects integrate scalable backend architectures with intelligent components, including <span className="purple">Generative AI</span> and <span className="purple">LLM-based workflows</span>.
              <br />
              <br />
              I am particularly drawn to solving problems at the intersection of <span className="purple">systems engineering</span> and <span className="purple">AI</span>, including real-time collaboration, anomaly detection, and adaptive learning platforms.
              <br />
              <br />
              I thrive in fast-paced, exploratory environments and am always eager to push boundaries with <span className="purple">automation</span>, <span className="purple">optimization</span>, and <span className="purple">meaningful tech applications</span>.
              <br />
              <br />
              <span>
                Forever eager to <strong className="purple">learn</strong>, <strong className="purple">innovate</strong>, and <strong className="purple">push boundaries</strong> — one system at a time.
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
