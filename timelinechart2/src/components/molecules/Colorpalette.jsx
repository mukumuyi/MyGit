import BaseInput from "../atoms/input/BaseInput";

export default function colorPalette(props) {
  const { item, onChange } = props;

  const r = 255 - parseInt(item.value.substr(1, 2), 16);
  const g = 255 - parseInt(item.value.substr(3, 2), 16);
  const b = 255 - parseInt(item.value.substr(5, 2), 16);

  return (
    <div style={{ position: "relative", flex: "1" }}>
      <BaseInput item={item} onChange={onChange} type="color" name="name"/>
      <label
        htmlFor={item.name}
        style={{
          backgroundColor: item.value,
          color: `rgb(${r}, ${g}, ${b})`,
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          borderRight: "1px solid #b6b6b6",
        }}
      >
        {item.label}
      </label>
    </div>
  );
}
