import Form from "./Form";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import { FaFolderOpen } from "react-icons/fa";
import { IoCloseSharp,IoMenuSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";


export default function ControlPanel(props) {
  const {
    changeDispState,
    dispControlPanel,
    changeDispControlPanelState,
    colSelector,
    onChangeCol,
    convDef,
    dateTypeSel,
    onChangeTime,
    timeSelected,
    onChangeWidth,
    widthSelected,
    onChangeColor,
    colorSelected,
    selectFile,
    itemSelector,
    handleSubmitSerch,
    handleSubmitFilter,
    sampleDate,
    cordinate, 
    setCordinate,
  } = props;

  const timeSpan = [
    { id: 1, name: "Span1h", value: "3600000", label: "1時間" },
    { id: 2, name: "Span2h", value: "7200000", label: "2時間" },
    { id: 3, name: "Span6h", value: "21600000", label: "6時間" },
    { id: 4, name: "Span12h", value: "43200000", label: "12時間" },
    { id: 5, name: "Span1d", value: "86400000", label: "1日" },
    { id: 6, name: "Span2d", value: "172800000", label: "2日" },
  ];

  const barWidth = [
    { id: 1, name: "BarThick", value: "40", label: "太" },
    { id: 2, name: "BarRegular", value: "20", label: "標準" },
    { id: 3, name: "BarThin", value: "12", label: "細" },
    { id: 4, name: "BarThinest", value: "8", label: "超細" },
  ];

  console.log("Render ContolPanel");
  return (
    <>
      {/* <div className="menu-buttom" style={{ position: "absolute", top: "5pt", left: "5pt" }}
    onClick={props.changeDispState} >
      <File x="0pt" y="0pt" width="30pt" height="30pt" color="#50a3a2" />      
  </div> */}
      <div
        className="menu-buttom"
        style={{
          position: "absolute",
          margin: "5pt",
          display: "inline-flex",
          flexFlow: "row wrap",
          gap: "5pt 5pt",
        }}
      >
        <div onClick={changeDispState}>
          <FaFolderOpen
          size="30pt"
          color="#50a3a2"
          />
        </div>
        <div onClick={()=>{setCordinate({x:0,y:0})}}>
          <RiArrowGoBackFill
          size="30pt"
          color="#50a3a2"
          />
        </div>
        <div onClick={changeDispControlPanelState}>
          {/* <div onClick={changeParmPanel}> */}
          {dispControlPanel === 1 || (
            <IoMenuSharp
            size="30pt"
            color="#50a3a2"
            />
          )}
          {dispControlPanel === 1 && (
            <IoCloseSharp
            size="30pt"
            color="#50a3a2"
            />
          )}
        </div>
      </div>
      {dispControlPanel === 1 && (
        <div
          className="control-panel"
          style={{
            position: "absolute",
            top: "5pt",
            left: "110pt",
            opacity: dispControlPanel,
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 3fr 7fr" }}
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
            <FormColor array={colorSelected} onChange={onChangeColor} />
          </div>
          <div className="container4">
            <label>表示期間</label>
            <label>バーの幅</label>
            <Form
              type="inline-text"
              id="Search"
              array={itemSelector}
              onChange={handleSubmitSerch}
              placeHolder="Search on timeline"
            />
          </div>
          <div className="container2">
            <Form
              type="inline-radio"
              array={timeSpan}
              onChange={onChangeTime}
              selected={timeSelected}
            />
            <Form
              type="inline-radio"
              array={barWidth}
              onChange={onChangeWidth}
              selected={widthSelected}
            />
            <Form
              type="inline-text"
              id="Filter"
              array={itemSelector}
              onChange={handleSubmitFilter}
              placeHolder="Filter on timeline"
            />
          </div>
        </div>
      )}
    </>
  );
}
