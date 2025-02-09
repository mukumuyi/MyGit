import React from "react";

import Radiobutton from "./Radiobutton";
import Colorpalette from "./Colorpalette";
import FormSelectOption from "./FormSelectOption";

export default function Form(props) {
  return (
    <form className={props.type} onSubmit={props.onChange}>
      {props.type == "inline-radio" &&
        props.array.map((item) => {
          return (
            <Radiobutton
              key={item.id}
              item={item}
              onChange={props.onChange}
              selected={props.selected}
            />
          );
        })}
      {props.type == "inline-color" &&
        props.array.map((item) => {
          return (
            <Colorpalette key={item.id} item={item} onChange={props.onChange} />
          );
        })}
      {props.type == "inline-text" && (
        <>
          <select>
            {props.array.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
          <input type="text" placeholder={props.placeHolder} />
        </>
      )}
      {props.type == "inline-select" && (
        <>
          <label htmlFor={props.id}>{props.name}</label>
          <select
            onChange={props.onChange}
            value={props.selected}
            id={props.id}
          >
            {props.array.map((item) => {
              return <FormSelectOption key={item.id} item={item} />;
            })}
          </select>
        </>
      )}
    </form>
  );
}
