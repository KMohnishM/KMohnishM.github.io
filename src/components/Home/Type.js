import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full‑Stack Developer",
          "AI Explorer",
          "Systems Architect",
          "Gen‑AI Engineer",
          "DevOps Engineer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
      }}
    />
  );
}

export default Type;
