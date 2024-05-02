import React, { useState, useRef ,useEffect} from "react";
import Rect from "./Rect";
import Line from "./Line";
import csvArray from "../csvArray";

export default function PlotArea(props) {
  // eventHandle
  const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const [gap, setGap] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const svgRef = useRef(null);
  const [tooltipText, setTooltipText] = useState({start:"1983/12/30" , end:"2099/12/31" ,name:"muku",desc:null});
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [showTooltipAll, setShowTooltipAll] = useState(false);

  // マウス押下時
  function onMouseDown(e) {
    setIsMouseDown(true);
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    setGap({ x: mouseX - cordinate.x, y: mouseY - cordinate.y });

  }

  // マウス押下解除時
  function onMouseUp(e) {
    setIsMouseDown(false);
  }

  // マウス移動時
  function onMouseMove(e) {
    // マウス押下中
    if (isMouseDown) {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const relativeX = mouseX ;
      const relativeY = mouseY ;

      setCordinate({ x: relativeX - gap.x < 0 ? relativeX - gap.x : 0, y: relativeY - gap.y < 0 ? relativeY - gap.y : 0 });

    }
  }

  // マウス通過時 idを取得して、csvArrayの値をtooltipのテキストに渡す。
  function onMouseOver(e) {
    const targetItem = csvArray.filter((item) => item.id == e.target.getAttribute("id"))[0];
    setTooltipText({
      start: new Date(targetItem.starting_time).toLocaleString("jp-JP"),
      end: new Date(targetItem.ending_time).toLocaleString("jp-JP"),
      name: targetItem.name,
    }); 
    setTooltipPos({
      x: e.pageX + 10,
      y: e.pageY - 20,
      visible: true,
    });
  }

  // マウス通過終了時
  function onMouseOut(e) {
    if(!showTooltipAll){
      setTooltipPos({
        x: e.pageX + 10,
        y: e.pageY - 20,
        visible: false,
      });
    }
  }

  function onDbClick(e){
    console.log("DbClick!!")
    if(showTooltipAll){
      setShowTooltipAll(false)
    } else {
      setShowTooltipAll(true)
    }
  }

  // basic parameters
  const [svgWidth,setWidth] = useState(props.width ? props.width : 1350); // 
  const [svgHeight,setHeight] = useState(props.height ? props.height : 650); // 
  const plotStartX = 100;
  const plotStartY = 50;
  const py1 = 25;

  // graph parameter
  const [frameTimespan,setFrameTimespan] = useState(53200000); // 1フレームの時間（6時間分）
  const [gHeight,setGHeight] = useState(parseInt(20));
  const [fontSize,setFontSize] = useState(parseInt(gHeight));
  const [fontColor,setFontColor] = useState(props.fontColor ? props.fontColor : "Black");

  const gMargin = gHeight / 4;
  const xAxisTimespan = frameTimespan / 6; // x軸の1目盛りの時間（1時間分）
  const scaleFactor = (1 / frameTimespan) * svgWidth;

  // Parameter 変更時の動作
  useEffect(() => {
    if (props.frameTimespan) {
      setFrameTimespan(props.frameTimespan);
    }
  }, [props.frameTimespan]);

  useEffect(() => {
    if (props.gHeight) {
      setGHeight(parseInt(props.gHeight));
    }
  }, [props.gHeight]);

  useEffect(() => {
    if (props.fontSize) {
      setFontSize(parseInt(props.fontSize));
    }
  }, [props.fontSize]);

  useEffect(() => {
    if (props.fontColor) {
      setFontColor(props.fontColor);
    }
  }, [props.fontColor]);

  const minTimeStamp =
    Math.floor(
      Math.min(
        ...csvArray
          .map((item) => parseInt(item.starting_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000;

  const maxTimeStamp =
    Math.ceil(
      Math.max(
        ...csvArray
          .map((item) => parseInt(item.ending_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000;

  const plotArray = csvArray
    .map((item) => ({
      key: item.id,
      length: (item.ending_time - item.starting_time) * scaleFactor,
      cx: (item.starting_time - minTimeStamp) * scaleFactor + cordinate.x,
      cy:
        gMargin * (parseInt(item.group) - 1 / 2) +
        gHeight * (parseInt(item.lane) - 1) +
        cordinate.y,
      barColor: "blue",
    }))
    .filter(
      (item) =>
        item.cx < svgWidth - plotStartX &&
        item.cx + item.length > 0 &&
        item.cy < svgHeight - plotStartY &&
        item.cy + gHeight > 0
    );

  const xAxisArray = Array.from(
    { length: Math.ceil((maxTimeStamp - minTimeStamp) / xAxisTimespan) + 1 },
    (_, index) => {
      const currentTime = new Date(minTimeStamp + index * xAxisTimespan);
      const dates = currentTime.toLocaleDateString("ja-JP", {
        month: "numeric",
        day: "numeric",
      });
      const hours = currentTime.getHours() + ":00";
      return {
        key: index,
        coord: "xAxis",
        cx:
          (currentTime - minTimeStamp) * scaleFactor +
          cordinate.x,
        cy: 25,
        labelD: `${dates}`,
        labelT: `${hours}`,
      };
    }
  ).filter(
    (item) =>
      item.cx < svgWidth - plotStartX &&
      item.cx > 0 &&
      item.cy < svgHeight - plotStartY &&
      item.cy > 0
  );

  function makeyAxisArray(inputArray, g_margin, g_height, ty) {
    //縦軸のラベル用データ作成
    const recordsArray = {};
    for (const item of inputArray) {
      // 配列をループ
      const group = parseInt(item.group);
      const lane = parseInt(item.lane);
      if (!recordsArray[group] || lane < recordsArray[group].lane) {
        // Groupごとに最小のkeyの値を更新
        recordsArray[group] = {
          key: group,
          group: item.grpname,
          lane: lane,
          coord: "yAxis",
          cx: 0,
          cy: g_margin * (group - 1) + g_height * (lane - 1) + ty,
        };
      }
    }
    const resultArray = Object.values(recordsArray); // 結果を配列に変換
    return resultArray;
  }

  const yAxisArray = makeyAxisArray(csvArray, gMargin, gHeight, cordinate.y);
  // .filter((item)=>item.cx < svgWidth - plotStartX && item.cx > 0 && item.cy < svgHeight - plotStartY && item.cy > 0)
  return (
    <div>
      {/* <svg width={svgWidth} height={svgHeight} fill="#5FC2C0"> */}
      <svg width={svgWidth} height={svgHeight} fill="#5FC2C0">
        <g id="yAxis-group" transform={`translate(0,${plotStartY})`}>
          <defs>
            <clipPath id="yAxis-clip">
              <rect
                x="0"
                y="0"
                width={plotStartX}
                height={svgHeight - plotStartY}
              ></rect>
            </clipPath>
          </defs>
          <rect
            className="yAxis drag-handler"
            x="0"
            y="0"
            width={plotStartX}
            height={svgHeight - plotStartY}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          ></rect>
          <g className="clipped-group" clipPath="url(#yAxis-clip)">
            {yAxisArray.map((item) => {
              return (
                <Line
                  key={item.key}
                  x1="0"
                  y1={item.cy}
                  x2={svgWidth}
                  y2={item.cy}
                  stroke="green"
                />
              );
            })}
            {yAxisArray.map((item) => {
              return (
                <text
                  key={item.key}
                  className="yAxis marker-label"
                  x="0"
                  y={item.cy + fontSize}
                  fill={fontColor}
                  style={{ fontSize: fontSize }}
                >
                  {item.group}
                </text>
              );
            })}
          </g>
        </g>
        <g id="xAxis1-group" transform={`translate(${plotStartX},0)`}>
          <defs>
            <clipPath id="xAxis1-clip">
              <rect
                x="0"
                y="0"
                width={svgWidth - plotStartX}
                height={plotStartY}
              ></rect>
            </clipPath>
          </defs>
          <rect
            className="xAxis1 drag-handler"
            x="0"
            y="0"
            width={svgWidth - plotStartX}
            height={plotStartY}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          ></rect>
          <g className="clipped-group" clipPath="url(#xAxis1-clip)">
            {xAxisArray.map((item) => {
              return (
                <Line
                  key={item.key}
                  x1={item.cx}
                  y1="0"
                  x2={item.cx}
                  y2={svgHeight}
                  stroke="green"
                />
              );
            })}
            {xAxisArray.map((item) => {
              return (
                <text
                  key={item.key}
                  className="xAxis1 marker-label "
                  x={item.cx}
                  y="25"
                  fill={fontColor}
                  style={{ fontSize: fontSize }}
                >
                  {item.labelT}
                </text>
              );
            })}
          </g>
        </g>
        <g
          id="plotArea-group"
          transform={`translate(${plotStartX},${plotStartY})`}
        >
          <defs>
            <clipPath id="plotArea-clip">
              <rect
                x="0"
                y="0"
                width={svgWidth - plotStartX}
                height={svgHeight - plotStartY}
              ></rect>
            </clipPath>
          </defs>
          <rect
            className="plotArea drag-handler"
            x="0"
            y="0"
            width={svgWidth - plotStartX}
            height={svgHeight - plotStartY}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          />
          <g
            className="clipped-group"
            clipPath="url(#plotArea-clip)"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          >
            {xAxisArray.map((item) => {
              return (
                <Line
                  key={item.key}
                  x1={item.cx}
                  y1="0"
                  x2={item.cx}
                  y2={svgHeight}
                  stroke="green"
                />
              );
            })}

            {yAxisArray.map((item) => {
              return (
                <Line
                  key={item.key}
                  x1="0"
                  y1={item.cy}
                  x2={svgWidth}
                  y2={item.cy}
                  stroke="green"
                />
              );
            })}

            {plotArray.map((item) => {
              return (
                <Rect
                  key={item.key}
                  id={item.key}
                  x={item.cx}
                  y={item.cy}
                  height={gHeight}
                  width={item.length}
                  fill={item.barColor}
                  stroke="green"
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  onDbClick={onDbClick}
                />
              );
            })}
          </g>
        </g>
      </svg>
      {tooltipPos.visible && (
      <div className="tooltip" style={{ top: tooltipPos.y + "px" , left: tooltipPos.x + "px" }}>
        {tooltipText.start && (("START:" + tooltipText.start))} 
        {tooltipText.start && <br /> }
        {tooltipText.end && (("END:" + tooltipText.end))} 
        {tooltipText.end && <br /> }
        {tooltipText.name && (("NAME:" + tooltipText.name))} 
        {tooltipText.name && <br /> }
        {tooltipText.desc && (("DESC:" + tooltipText.desc))} 
        {tooltipText.desc && <br /> }
      </div>
    )}
    </div>
  );
}
