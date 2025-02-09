import React from "react";

export default function Radiobutton(props) {

        return (
            <div>
              <input
                type="radio"
                name="name"
                value={props.item.value}
                id={props.item.name}
                checked={props.item.value == props.selected}
                onChange={props.onChange}
              />
              <label htmlFor={props.item.name}>{props.item.label}</label>
            </div>
        );
}
