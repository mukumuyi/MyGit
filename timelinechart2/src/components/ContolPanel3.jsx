import Form from "./Form";
import { File, Cross, Humberger, Home, Sunna, Graph } from "./Svg";
import FormInputFile from "./FormInputFile";
import FormColumnSelector from "./FormColumnSelector";

export default function ControlPanel(props) {
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
          top: "5pt",
          left: "5pt",
          display: "inline-flex",
          flexFlow: "row wrap",
          gap: "5pt 10pt",
        }}
      ><div
      onClick={props.changeDispState}
    >
      <Home
        x="0pt"
        y="0pt"
        width="30pt"
        height="30pt"
        color="#50a3a2"
      />
    </div>
        <div onClick={props.changeDispControlPanelState}>
          {/* <div onClick={changeParmPanel}> */}
          {props.dispControlPanel === 1 || (
            <Humberger
              x="0pt"
              y="0pt"
              width="30pt"
              height="30pt"
              color="#50a3a2"
            />
          )}
          {props.dispControlPanel === 1 && (
            <Cross x="0pt" y="0pt" width="30pt" height="30pt" color="#50a3a2" />
          )}
        </div>
      </div>
      {props.dispControlPanel === 1 && (
        <div
          className="control-panel"
          style={{
            position: "absolute",
            top: "45pt",
            left: "45pt",
            opacity: props.dispControlPanel,
          }}
        >
          <FormColumnSelector
            colSelector={props.colSelector}
            onChangeCol={props.onChangeCol}
            convDef={props.convDef}
          />
          <div className="container4">
            <label>日付型 {props.sampleDate}</label>
            <label>項目の色</label>
          </div>
          <div className="container2">
            <Form
              type="inline-radio"
              array={props.dateTypeSel}
              onChange={props.onChangeCol}
              selected={props.convDef.dateType}
            />
            <Form
              type="inline-color"
              array={props.colorSelected}
              onChange={props.onChangeColor}
            />
          </div>
          <div className="container4">
            <label>表示期間</label>
            <label>バーの幅</label>
            <Form
              type="inline-text"
              id="Search"
              array={props.itemSelector}
              onChange={props.handleSubmitSerch}
              placeHolder="Search on timeline"
            />
          </div>
          <div className="container2">
            <Form
              type="inline-radio"
              array={timeSpan}
              onChange={props.onChangeTime}
              selected={props.timeSelected}
            />
            <Form
              type="inline-radio"
              array={barWidth}
              onChange={props.onChangeWidth}
              selected={props.widthSelected}
            />
            <Form
              type="inline-text"
              id="Filter"
              array={props.itemSelector}
              onChange={props.handleSubmitFilter}
              placeHolder="Filter on timeline"
            />
          </div>
        </div>
      )}
    </>
  );
}