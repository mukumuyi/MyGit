import React from "react";

import FormSelect from "../molecules/FormSelect";
import FormColor from "../molecules/FormColor";
import Datagrid from "../molecules/Datagrid";

import { DateTypeDef } from "../Config";

export const ImportArea = (props) => {
  const {
    convDef,
    colSelector,
    colorSelected,
    inputData,
    originData,
    setColorSelected,
    setDrawFlag,
    setConvDef,
  } = props;

  const dateTypeSel = DateTypeDef;

  const onChangeCol = (e) => {
    const { name, value } = e.target;
    // setDrawFlag(false);
    setConvDef({ ...convDef, [name]: value });

    if (name === "colColor") {
      const uniqueStatusList = [
        ...new Set(inputData.map((item) => item[value])),
      ];
      const assignColor = (index, length) => {
        const hex = Math.floor(((index + 1) * 0xffffff) / length)
          .toString(16)
          .padStart(6, "0"); // インデックスに応じて色を計算
        return `#${hex.toUpperCase()}`; // #FFFFFF 形式の色コードを返す
      };

      setColorSelected(
        uniqueStatusList.map((item, index) => ({
          id: index + 1,
          name: item,
          value: assignColor(index, uniqueStatusList.length),
          label: item,
        })),
      );
    }
  };

  function onChangeColor(e) {
    const updatedColors = colorSelected.map((color) => {
      if (color.name === e.target.id) {
        // "Wait"の場合は新しい値に更新
        return { ...color, value: e.target.value };
      }
      return color;
    });

    // 更新された配列をセット
    setColorSelected(updatedColors);
  }

  console.log(
    "=== RENDER IMPORT AREA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "===",
  );

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
