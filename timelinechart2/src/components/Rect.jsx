export default function Rect(props) {
    return (
      <rect
        className="plotArea marker-rect"
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
        style={{ fill: props.fill, stroke: props.stroke }}
      />
    );
  }