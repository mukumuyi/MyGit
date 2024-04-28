import React, { useState } from "react";

function Button(props) {
  const [color, setColor] = useState(props.color);

  function mouseOver() {
    setColor(props.touchColor);
  }

  function mouseOut() {
    setColor(props.color);
  }

  return (
    <button
      onClick={() => props.onClick("Clicked")}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={{ backgroundColor: color }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d={props.svg} />
      </svg>
      {props.text}
    </button>
  );
}

export default Button;
