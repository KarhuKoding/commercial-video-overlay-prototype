import React from "react";
import { animated, useSpring } from "react-spring";
import "./pointer.css";

function Pointer({ title = "test", position = [50, 50], ...props }) {
  const animatedPosition = useSpring({
    from: {
      top: position[0],
      left: position[1],
    },
    to: {
      top: position[0],
      left: position[1],
    },
  });

  return (
    <animated.div
      onClick={() => console.log("hello")}
      className="pointer-element"
      style={animatedPosition}
    >
      {title}
    </animated.div>
  );
}

export default Pointer;
