import { useState, useEffect } from "react";
import Form from "./Form";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import { HeaderFromLocalFile, DrawGraph ,HeaderFromData} from "./DataInput";
import FormInputFile from "./FormInputFile";
import { FaDatabase, FaFolderOpen } from "react-icons/fa";
import { FaChartGantt, FaEarthAsia } from "react-icons/fa6";

// 画面の表示・非表示ボタンの実装
// 入力タイプの実装（LOCAL、DB、SITE）
// SQLエディタの実装

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
    sampleDate,
    setDrawFlag,
  } = props;

  const inputTypeSelector = [
    { id: 1, name: "LOCAL", value: "LOCAL", label: "LOCAL" },
    { id: 2, name: "DB", value: "DB", label: "DB" },
    { id: 3, name: "HTTP", value: "HTTP", label: "HTTP" },
  ];

  const [inputTypeSelected, setInputTypeSelected] = useState("LOCAL");
  const [sql, setSql] = useState("SELECT id, name FROM public.users");
  const [fileList, setFileList] = useState([
    {
      id: 0,
      name: "input00.csv",
      value: "input00.csv",
      label: "input00.csv",
    },
    {
      id: 1,
      name: "input01.csv",
      value: "input01.csv",
      label: "input01.csv",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState("input00.csv");

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
      HeaderFromData(data.rows, setColSelector, setInputData)
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const readFileFromHttp = async (selectedFile) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/file/" + selectedFile
      );
      // console.log(response)
      // const data = await response.text();
      const data = await response.json();
      console.log(data);
      // console.log(typeof data);
      // setTasks(data.rows);
      HeaderFromData(data, setColSelector, setInputData,setOriginData)   
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

  // useEffect(() => {
  //   getIncompleteTasks();
  // }, [sql]);

  // textareaの値が変更されたときに実行される関数
  const handleTextareaChange = (event) => {
    setSql(event.target.value);
  };

  const onDbClick = () => {
    executeQuery();
  };

  const onHttpClick = () => {
    readFileFromHttp(selectedFile);
  };

  const onStartDraw = async function (e) {
    await DrawGraph(convDef, inputData, setInputData, setDrawFlag);
    changeDispState();
  };

  const onChangeInputType = (e) => {
    setInputTypeSelected(e.target.value);
    // console.log(e.target.value)
    if (e.target.value === "HTTP") {
      makeFileList();
    }
  };

  const onChangeSelectedFile = (e) => {
    // console.log(e.target.value)
    setSelectedFile(e.target.value);
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, setColSelector,setInputData, setOriginData);
  }

  // useEffect(() => {
  //   console.log(inputData);
  //   console.log(convDef);
  // }, [inputData]);

  // useEffect(() => {
  //   console.log(colSelector);
  // }, [colSelector]);

  console.log("Render ImportArea");
  return (
    <>
      <div
        className="menu-buttom"
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
          <div>
            <Form
              type="inline-radio"
              array={inputTypeSelector}
              onChange={onChangeInputType}
              selected={inputTypeSelected}
            />
          </div>

          {inputTypeSelected === "LOCAL" && (
            <div
              style={{
                marginTop: "5pt",
              }}
            >
              <FormInputFile selectFile={selectFile}>
                <FaFolderOpen size="30pt" />
                {/* <File x="0pt" y="5pt" width="30pt" height="30pt" color="white" /> */}
              </FormInputFile>
            </div>
          )}
          {inputTypeSelected === "DB" && (
            <div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5pt",
                }}
              >
                <FaDatabase size="30pt" onClick={onDbClick} />
                <textarea
                  name="sql"
                  id="sqledit"
                  cols="30"
                  rows="10"
                  placeholder="Please enter SQL & click DB icon"
                  value={sql} // textareaの値をstateと紐付ける
                  onChange={handleTextareaChange} // textareaの値が変更されたときに呼び出される関数を指定
                  style={{
                    // width: "200pt",
                    margin: "5pt",
                  }}
                ></textarea>
              </form>
            </div>
          )}

          {inputTypeSelected === "HTTP" && (
            <div
              style={{
                marginTop: "5pt",
                display:"grid" ,
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <FaEarthAsia size="30pt" onClick={onHttpClick} />
              <FormSelect
                id="httpFile"
                label="ファイル選択"
                value={selectedFile}
                onChangeCol={onChangeSelectedFile}
                selectItem={fileList}
              />
            </div>
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
        </div>
      </div>
    </>
  );
}

export default ImportArea;
