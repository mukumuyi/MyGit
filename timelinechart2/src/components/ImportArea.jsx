import { useState, useEffect } from "react";
import Form from "./Form";
import { File, Cross, Humberger, Graph } from "./Svg";
import { HeaderFromLocalFile, DrawGraph } from "./DataInput";
import FormInputFile from "./FormInputFile";
import FormColumnSelector from "./FormColumnSelector";

// 画面の表示・非表示ボタンの実装
// 入力タイプの実装（LOCAL、DB、SITE）
// SQLエディタの実装

function ImportArea(props) {
  const inputTypeSelector = [
    { id: 1, name: "LOCAL", value: "LOCAL", label: "LOCAL" },
    { id: 2, name: "DB", value: "DB", label: "DB" },
    { id: 3, name: "HTTP", value: "HTTP", label: "HTTP" },
  ];

  const [inputTypeSelected, setInputTypeSelected] = useState("LOCAL");
  // const [inputData,setInputData] = useState([]);

  const onStartDraw = async function (e) {
    await DrawGraph(props.convDef, props.inputData, props.setInputData);
    props.changeDispState();
  };

  const onChangeInputType = (e) => {
    setInputTypeSelected(e.target.value);
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, props.setColSelector, props.setInputData);
  }

  // useEffect(() => {
  //   console.log(props.inputData);
  //   console.log(props.convDef);
  // }, [props.inputData]);

  // useEffect(() => {
  //   console.log(props.colSelector);
  // }, [props.colSelector]);

  return (
    <>
      <div
        className="menu-buttom"
        style={{ position: "absolute", top: "5pt", left: "5pt" }}
        onClick={onStartDraw}
      >
        <Graph x="0pt" y="0pt" width="30pt" height="30pt" color="white" />
      </div>
      <div
        style={{
          position: "absolute",
          top: "45pt",
          left: "5pt",
          width: "200pt",
        }}
      >
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
            position: "absolute",
            top: "75pt",
            left: "5pt",
          }}
        >
          <FormInputFile selectFile={selectFile}>
            <File x="0pt" y="5pt" width="30pt" height="30pt" color="white" />
          </FormInputFile>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "45pt",
          left: "300pt",
          width: "600pt",
        }}
      >
        <FormColumnSelector
          colSelector={props.colSelector}
          onChangeCol={props.onChangeCol}
          convDef={props.convDef}
        />
      </div>
    </>
  );
}

export default ImportArea;
