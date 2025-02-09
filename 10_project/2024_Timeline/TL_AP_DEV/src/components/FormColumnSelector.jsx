import React from "react";

import Form from "./Form"

export default function FormColumnSelector(props){
    return (
        
    <div style={{ display: "flex", flexWrap: "wrap"}}>
    <Form
      type="inline-select"
      id="colGrp"
      name="縦軸選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colGrp}
    />
    <Form
      type="inline-select"
      id="colColor"
      name="色選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colColor}
    />
    <Form
      type="inline-select"
      id="colStart"
      name="開始選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colStart}
    />
    <Form
      type="inline-select"
      id="colEnd"
      name="終了選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colEnd}
    />
    <Form
      type="inline-select"
      id="colName"
      name="名前選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colName}
    />
    <Form
      type="inline-select"
      id="colDesc"
      name="コメント選択"
      array={props.colSelector}
      onChange={props.onChangeCol}
      selected={props.convDef.colDesc}
    />
  </div>
    )
} 