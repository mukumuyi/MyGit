import FormInputFile from "./FormInputFile";
import { FaFolderOpen } from "react-icons/fa";

const InputLocal = (props) => {
    const {selectFile } = props;
  return (
    <div
      style={{
        marginTop: "5pt",
      }}
    >
      <FormInputFile selectFile={selectFile}>
        <FaFolderOpen size="30pt" />
      </FormInputFile>
    </div>
  );
};

export default InputLocal;
