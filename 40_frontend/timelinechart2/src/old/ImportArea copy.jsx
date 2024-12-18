import { useState, useEffect } from "react";
import Form from "./Form";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import { HeaderFromLocalFile, DrawGraph, HeaderFromData } from "./DataInput";
import { FaChartGantt } from "react-icons/fa6";
import Datagrid from "./Datagrid";
import InputLocal from "./InputLocal";
import InputDB from "./InputDB";
import InputHttp from "./InputHttp";
import {InputTypeSelectDef,SqlDef,FileListDef} from "./Config"

// 画面の表示・非表示ボタンの実装
// 入力タイプの実装（LOCAL、DB、HTTP）
// SQLエディタの実装
// Gridデータの表示
// 

function ImportArea(props) {
  const {
    setColSelector,
    changeDispState,
    colSelector,
    onChangeCol,
    convDef,
    dateTypeSel,
    onChangeColor,
    colorSelected,
    inputData,
    setInputData,
    setOriginData,
    originData,
    setDrawFlag,
  } = props;

  const inputTypeSelector = InputTypeSelectDef
  const [inputTypeSelected, setInputTypeSelected] = useState(InputTypeSelectDef[0].name);
  const [sql, setSql] = useState(SqlDef);
  const [fileList, setFileList] = useState(FileListDef);
  const [selectedFile, setSelectedFile] = useState(FileListDef[0].name);

  const executeQuery = async () => {
    try {
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
          // 基本的にはDBの切り替えはサーバー側の処理で行う。
          // host: "localhost",
          // user: "postgres",
          // database: "world",
          // password: "XXXX",
          // port: "5432",
          sql: sql,
        }),
      };
      const response = await fetch("http://localhost:3000/api/db", params);
      const data = await response.json();
      // console.log(data.rows);
      HeaderFromData(data.rows, setColSelector, setInputData);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const makeFileList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/filelist");
      const tempList = await response.json();
      setFileList(tempList);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // textareaの値が変更されたときに実行される関数
  const handleTextareaChange = (event) => {
    setSql(event.target.value);
  };

  const onDbClick = () => {
    executeQuery();
  };

  const onStartDraw = async function (e) {
    await DrawGraph(convDef, inputData, setInputData, setDrawFlag);
    changeDispState();
  };

  const onChangeInputType = (e) => {
    setInputTypeSelected(e.target.value);
  };

  useEffect(() => {
    if (inputTypeSelected === "HTTP") {
      makeFileList();
    }
  }, [inputTypeSelected]); 

  const onChangeSelectedFile = (e) => {
    setSelectedFile(e.target.value);
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, setColSelector, setInputData, setOriginData);
  }

  console.log(
    "=== RENDER ImportArea START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
    );
    
  return (
    <>
      <div
        style={{ margin: "5pt" }}
        onClick={onStartDraw}
      >
        <FaChartGantt size={"30pt"} />
      </div>
      <div
        style={{
          display: "grid",
          margin: "5pt",
          gridTemplateColumns: "3fr 1fr 8fr",
        }}
      >
        <div
          style={{
            display: "grid",
            margin: "5pt",
          }}
        >
          <Form
            type="inline-radio"
            array={inputTypeSelector}
            onChange={onChangeInputType}
            selected={inputTypeSelected}
          />

          {inputTypeSelected === "LOCAL" && (
            <InputLocal selectFile={selectFile} />
          )}
          {inputTypeSelected === "DB" && (
            <InputDB
              onDbClick={onDbClick}
              sql={sql}
              handleTextareaChange={handleTextareaChange}
            />
          )}

          {inputTypeSelected === "HTTP" && (
            <InputHttp
              selectedFile={selectedFile}
              onChangeSelectedFile={onChangeSelectedFile}
              fileList={fileList}
              setColSelector={setColSelector}
              setInputData={setInputData}
              setOriginData={setOriginData}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: "45pt",
            left: "300pt",
            width: "600pt",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr",
              margin: "5pt",
            }}
          >
            <FormSelect
              id="colGrp"
              label="縦軸選択"
              value={convDef.colGrp}
              onChangeCol={onChangeCol}
              selectItem={colSelector}
            />
            <FormSelect
              id="colColor"
              label="色選択"
              value={convDef.colColor}
              onChangeCol={onChangeCol}
              selectItem={colSelector}
            />
            <FormSelect
              id="colStart"
              label="開始選択"
              value={convDef.colStart}
              onChangeCol={onChangeCol}
              selectItem={colSelector}
            />
            <FormSelect
              id="colEnd"
              label="終了選択"
              value={convDef.colEnd}
              onChangeCol={onChangeCol}
              selectItem={colSelector}
            />
            <FormSelect
              id="colName"
              label="名前選択"
              value={convDef.colName}
              onChangeCol={onChangeCol}
              selectItem={colSelector}
            />
            <FormSelect
              id="colDesc"
              label="コメント選択"
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
        </div>
      </div>
    </>
  );
}

export default ImportArea;
