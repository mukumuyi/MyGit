import React from "react";

import { FaPlay, FaRegWindowClose } from "react-icons/fa";

import FormSelect from "./FormSelect";
import { HeaderFromData } from "./DataInput";
import { url } from "./Config";

const InputHttp = (props) => {
  const {
    setColSelector,
    setInputData,
    setInputTypeSelected,
    setOriginData,
    selectedFile,
    onChangeSelectedFile,
    onCloseClick,
    fileList,
  } = props;

  const readFileFromHttp = async () => {
    try {
      const response = await fetch(
        url.file + selectedFile
      );
      const data = await response.json();
      HeaderFromData(data,  setColSelector, setInputData, setOriginData);
      alert("データの取込完了しました。");
      setInputTypeSelected("LOCAL");
    } catch (error) {
      console.error("エラー:", error);
      alert("ファイル取得エラーが発生しました。\n" + error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "5pt",
      }}
    >
      <div style={{ display: "inline-flex",gap:"5pt" ,margin:"10pt"}}>
        <FaPlay size="15pt" onClick={readFileFromHttp} />
        <FaRegWindowClose
          size="15pt"
          onClick={() => {
            onCloseClick("LOCAL");
          }}
        />
      </div>
      <FormSelect
        id="httpFile"
        label="ファイル選択"
        value={selectedFile}
        onChangeCol={onChangeSelectedFile}
        selectItem={fileList}
      />
    </div>
  );
};

export default InputHttp;
