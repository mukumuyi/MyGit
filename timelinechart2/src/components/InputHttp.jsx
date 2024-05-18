import { FaPlay, FaRegWindowClose } from "react-icons/fa";

import FormSelect from "./FormSelect";
import { HeaderFromData } from "./DataInput";

const InputHttp = (props) => {
  const {
    setColSelector,
    setInputData,
    setOriginData,
    selectedFile,
    onChangeSelectedFile,
    onCloseClick,
    fileList,
  } = props;

  const readFileFromHttp = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/file/" + selectedFile
      );
      const data = await response.json();
      HeaderFromData(data, setColSelector, setInputData, setOriginData);
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
        <FaPlay size="20pt" onClick={readFileFromHttp} />
        <FaRegWindowClose
          size="20pt"
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
