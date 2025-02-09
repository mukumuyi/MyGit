import React from "react";

export default function Line(props) {
    return (
      <line
        className="plotArea marker-line "
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        style={{ stroke: props.stroke }}
      />
    );
  }