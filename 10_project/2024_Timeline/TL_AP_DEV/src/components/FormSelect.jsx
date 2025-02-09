import React from "react";

import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

export default function FormSelect(props) {
  const { id, label, value, onChangeCol, selectItem } = props;
  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        defaultValue="SELECT"
        labelId={id}
        name={id}
        label={label}
        value={value}
        onChange={onChangeCol}
        sx={{ height: "20pt", background: "white" }}
      >
        {selectItem.map((item) => {
          return (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
