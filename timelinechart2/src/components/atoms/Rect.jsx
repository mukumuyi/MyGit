export default function Rect(props) {
  const {
    id,
    x,
    y,
    height,
    width,
    fill,
    stroke,
    tooltipPos,
    onMouseOver,
    onMouseOut,
    onClick,
    onMouseDown,
  } = props;

  return (
    <rect
      className="plotArea marker-rect"
      id={id}
      x={x}
      y={y}
      height={height}
      width={width}
      style={{
        fill: fill,
        stroke: stroke,
        cursor: tooltipPos ? "pointer" : "default",
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      onMouseDown={onMouseDown}
    />
  );
}
