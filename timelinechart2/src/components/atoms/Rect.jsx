export default function Rect(props) {
  const {
    item,
    id = item.key,
    x = item.x,
    y = item.y,
    height = item.height,
    width = item.width,
    fill = item.fill,
    stroke = "green",
    tooltipPos,
    onMouseOver,
    onMouseOut,
    onClick,
    onMouseDown,
  } = props;

  return (
    <rect
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
