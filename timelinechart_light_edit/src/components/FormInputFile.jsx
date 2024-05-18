function FormInputFile(props) {
    const inputTagClick = () => {
      document.getElementById('inputFileUpload').click();
    };
  
    return (
      <div
        onClick={inputTagClick}
        style={{ opacity: props.opacityParmPanel }}
      >
        {props.children}
        <input type="file" accept=".csv" onChange={props.selectFile} id="inputFileUpload" style={{ display: "none" }}></input>
      </div>
    );
  }
  
  export default FormInputFile;