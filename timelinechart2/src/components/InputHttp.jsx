import { FaEarthAsia } from "react-icons/fa6";
import FormSelect from "./FormSelect";
import { HeaderFromData } from "./DataInput";

const InputHttp = (props) => {
  const {
    setColSelector,
    setInputData,
    setOriginData,
    selectedFile,
    onChangeSelectedFile,
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
    }
  };

  return (
    <div
      style={{
        marginTop: "5pt",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <FaEarthAsia size="30pt" onClick={readFileFromHttp} />
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
