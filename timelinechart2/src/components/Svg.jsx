import React, { useState } from "react";
import PlotArea from "./PlotArea";


export default function Svg(props) {
  return (
    <div>
      <svg width={props.width} height={props.height}>
        <PlotArea />
      </svg>
      <div className="tooltip"></div>
    </div>
  );
}
