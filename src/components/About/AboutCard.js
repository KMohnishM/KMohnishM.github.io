import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Mohnish Mythreya </span>
            from <span className="purple"> Visakhaptanam, Andhra Pradesh .</span>
            <br />
            I am currently Studying 2nd Year at <strong className="purple">VIT </strong>Chennai.
            <br />
            I have completed My <strong className="purple">12th</strong> at Sri Chaitanya.
            <br />
            Apart from coding, some other activities that<strong className="purple"> I love to do! </strong> 
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
