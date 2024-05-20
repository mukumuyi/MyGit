import Form from "./Form";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import { IoCloseSharp,IoMenuSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import {BarWidthDef,TimeSpanDef} from "./Config"


export default function ControlPanel(props) {
  const {
    dispControlPanel,
    changeDispControlPanelState,
    colSelector,
    onChangeCol,
    convDef,
    onChangeTime,
    timeSelected,
    onChangeWidth,
    widthSelected,
    onChangeColor,
    colorSelected,
    itemSelector,
    handleSubmitSerch,
    handleSubmitFilter,
    setCordinate,
  } = props;

  const timeSpan = TimeSpanDef;
  const barWidth = BarWidthDef;

  console.log(
    "=== RENDER CONTOL PANEL START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  
  return (
    <>
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
        {/* <div onClick={changeDispState}>
          <FaFolderOpen
          size="30pt"
          color="#50a3a2"
          />
        </div> */}
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
      </div>
    </>
  );
}
