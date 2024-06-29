export default function Line(props) {
  const { x1, x2, y1, y2, stroke = "green" } = props;

  return <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: stroke }} />;
}
