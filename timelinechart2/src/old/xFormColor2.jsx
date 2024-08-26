import React, { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { ChromePicker } from "react-color";

export default function FormColor(props) {
  const { item, onChage } = props;
  const [color, setColor] = useState("#000000");
  const [showPicker, setShowPicker] = useState(false);
  const r = 255 - parseInt(item.value.substr(1, 2), 16);
  const g = 255 - parseInt(item.value.substr(3, 2), 16);
  const b = 255 - parseInt(item.value.substr(5, 2), 16);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          height: "20pt",
          color: `rgb(${r}, ${g}, ${b})`,
          backgroundColor: item.value,
        }}
        onClick={handleButtonClick}
      >
        {props.item.label}
      </Button>
      {showPicker && (
        <div style = {{position:"fixed  "}}>
        <ChromePicker color={color} onChange={handleColorChange}/>
        </div>
      )}
    </div>
  );
}
