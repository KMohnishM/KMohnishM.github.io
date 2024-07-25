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
            I'm passionate about programming and building <strong className="purple">innovative</strong> web technologies and products.   
              <br />
              <br />With a solid foundation in <strong className="purple">Python  C++  React</strong>  ...  I always try to create <strong className="purple">impactful</strong> solutions.
      
              <br />
              <br />
              My field of Interest's are building new  &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  AI-ML
                </b>
              </i>
              <br />
              <br />
            Whenever the opportunity arises, I channel my passion for building products through <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Express.js</b>
              </i>
              <br />
              <br />

              <span>Always eager to <strong className="purple">learn</strong>, <strong className="purple">innovate</strong> , <strong className="purple">collaborate</strong> to push the boundaries of technology.</span>
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
