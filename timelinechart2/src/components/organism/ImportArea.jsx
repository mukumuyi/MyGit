import React from "react";

import FormSelect from "../molecules/FormSelect";
import FormColor from "../molecules/FormColor";
import Datagrid from "../molecules/Datagrid";

import { DateTypeDef } from "../Config";

export const ImportArea = (props) => {
  const {
    convDef,
    onChangeCol,
    colSelector,
    colorSelected,
    onChangeColor,
    originData,
  } = props;

  const dateTypeSel = DateTypeDef;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr",
          margin: "5pt",
        }}
      >
        <FormSelect
          id="colGrp"
          label="縦軸選択(grpname)"
          value={convDef.colGrp}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
        <FormSelect
          id="colColor"
          label="色選択(color)"
          value={convDef.colColor}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
        <FormSelect
          id="colStart"
          label="開始選択(start)"
          value={convDef.colStart}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
        <FormSelect
          id="colEnd"
          label="終了選択(end)"
          value={convDef.colEnd}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
        <FormSelect
          id="colName"
          label="名前選択(name)"
          value={convDef.colName}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
        <FormSelect
          id="colDesc"
          label="コメント選択(desc)"
          value={convDef.colDesc}
          onChangeCol={onChangeCol}
          selectItem={colSelector}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 3fr",
          margin: "5pt",
        }}
      >
        <FormSelect
          id="dateType"
          label="日付型選択"
          value={convDef.dateType}
          onChangeCol={onChangeCol}
          selectItem={dateTypeSel}
        />
        <FormColor array={colorSelected} onChange={onChangeColor} />
      </div>
      <div>
        <Datagrid originData={originData} colSelector={colSelector} />
      </div>
    </>
  );
};
