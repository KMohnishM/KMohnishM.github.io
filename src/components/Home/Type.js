import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer",
          "AI Systems Engineer",
          "GSoC 2026 @ Debezium",
          "Open Source Contributor",
          "Backend & DevOps Engineer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
      }}
    />
  );
}

export default Type;
