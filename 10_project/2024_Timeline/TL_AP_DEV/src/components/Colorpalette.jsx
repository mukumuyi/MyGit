import React from "react";

export default function colorPalette(props) {
  const r = 255 - parseInt(props.item.value.substr(1, 2), 16);
  const g = 255 - parseInt(props.item.value.substr(3, 2), 16);
  const b = 255 - parseInt(props.item.value.substr(5, 2), 16);

  return (
    <div style={{position: "relative",flex: "1"}}>
      <input
        type="color"
        name="name"
        value={props.item.value}
        id={props.item.name}
        onChange={props.onChange}
        style={{ width: "100%", height: "100%", opacity: "1" }}
      />
      <label
        htmlFor={props.item.name}
        style={{
          backgroundColor: props.item.value,
          color: `rgb(${r}, ${g}, ${b})`,
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%", height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          borderRight: "1px solid #b6b6b6",
        }}
      >
        {props.item.label}
      </label>
    </div>
  );
}
