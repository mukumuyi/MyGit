export default function Rect(props) {

    return (
      <rect
        className="plotArea marker-rect"
        id={props.id}
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
        style={{ fill: props.fill, stroke: props.stroke ,cursor: props.tooltipPos ? "pointer" : "default"}}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
      />
    );
  }