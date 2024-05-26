import { FaFolderOpen } from "react-icons/fa";

import FormInputFile from "../molecules/FormInputFile";

const InputLocal = (props) => {
  const { selectFile } = props;
  return (
    <div
      style={{
        marginTop: "5pt",
      }}
    >
      <FormInputFile selectFile={selectFile}>
        <FaFolderOpen size="15pt" />
      </FormInputFile>
    </div>
  );
};

export default InputLocal;
