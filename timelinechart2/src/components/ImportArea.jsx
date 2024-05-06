import { useState, useEffect} from "react";
import Form from "./Form";
import { File, Cross, Humberger, Graph } from "./Svg";
import { GetHeaderFromLocalFile,DrawGraph } from "./DataInput";

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
  const [inputData,setInputData] = useState([]);

  const onStartDraw = (e) => {
    DrawGraph(props.convDef,inputData,props.setInputArray)
    props.changeDispState();
  };

  const onChangeInputType = (e) => {
    setInputTypeSelected(e.target.value);
  };

  function selectFile(e) {
    GetHeaderFromLocalFile(e,props.setColSelector,setInputData);
  }
  
  useEffect(() => {
    console.log(inputData)
  },[inputData])

  useEffect(() => {
    console.log(props.colSelector)
  },[props.colSelector])
  
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
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={selectFile}
            style={{ position: "absolute", top: "85pt", left: "5pt" }}
          ></input>
        </div>
      )}
      {/* <div
        style={{
          position: "absolute",
          top: "45pt",
          left: "300pt",
          width: "500pt",
        }}
      >
        GrpNameカラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColGrp}
          selected={props.colSelectedGrp}
        />
        色カラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColColor}
          selected={props.colSelectedColor}
        />
        開始カラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColStart}
          selected={props.colSelectedStart}
        />
        終了カラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColEnd}
          selected={props.colSelectedEnd}
        />
        名前カラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColName}
          selected={props.colSelectedName}
        />
        コメントカラムの選択
        <Form
          type="inline-radio"
          array={props.colSelector}
          onChange={props.onChangeColDesc}
          selected={props.colSelectedDesc}
        />        
      </div> */}
    </>
  );
}

export default ImportArea;
