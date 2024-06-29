import React, { useState } from "react";

import { FaPlay, FaRegWindowClose } from "react-icons/fa";

import FormSelect from "../molecules/FormSelect";
import { HeaderFromData } from "../module/DataInput";
import { FileListDef, url } from "../Config";

const InputHttp = (props) => {
  const { setColSelector, setInputData, setOriginData, onCloseClick } = props;

  const [selectedFile, setSelectedFile] = useState(FileListDef[0].name);
  const [fileList, setFileList] = useState(FileListDef);

  const makeFileList = async () => {
    try {
      const response = await fetch(url.filelist);
      const tempList = await response.json();
      setFileList(tempList);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const readFileFromHttp = async () => {
    try {
      const response = await fetch(url.file + selectedFile);
      const data = await response.json();
      HeaderFromData(data, setColSelector, setInputData, setOriginData);
    } catch (error) {
      console.error("エラー:", error);
      alert("ファイル取得エラーが発生しました。\n" + error);
    }
  };

  const onChangeSelectedFile = (e) => {
    setSelectedFile(e.target.value);
  };

  makeFileList();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "5pt",
      }}
    >
      <div style={{ display: "inline-flex", gap: "5pt", margin: "10pt" }}>
        <FaPlay size="15pt" onClick={readFileFromHttp} />
        <FaRegWindowClose
          size="15pt"
          onClick={() => {
            onCloseClick("Import");
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
