import React, { useState, useRef, useEffect, memo } from "react";
import Rect from "./Rect";
import Line from "./Line";
// import TextField from '@mui/material/TextField';
// import { ParseDateCol } from "./DataControl";
// import csvArray from "../csvArray.json";

export const PlotArea = memo((props) => {
  // props

  // eventHandle
  // const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const {cordinate, setCordinate} = props
  const [gap, setGap] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [tooltipText, setTooltipText] = useState({});
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [showTooltipAll, setShowTooltipAll] = useState(false);

  // マウス押下時
  function onMouseDown(e) {
    setIsMouseDown(true);
    setTooltipPos({
      x: tooltipPos.x,
      y: tooltipPos.y,
      visible: false,
    });
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

      const relativeX = mouseX;
      const relativeY = mouseY;

      setCordinate({
        x: relativeX - gap.x < 0 ? relativeX - gap.x : 0,
        y: relativeY - gap.y < 0 ? relativeY - gap.y : 0,
      });
    }
  }

  let mouseOverTimer = "";

  // マウス通過時 idを取得して、props.inputDataの値をtooltipのテキストに渡す。
  function onMouseOver(e) {
    // console.log("Click Rect")
    if (mouseOverTimer) {
      clearTimeout(mouseOverTimer);
    }
    mouseOverTimer = setTimeout(() => {
      const targetItem = props.inputData.filter(
        (item) => item.id == e.target.getAttribute("id")
      )[0];
      setTooltipText({
        start: new Date(targetItem.starting_time).toLocaleString("jp-JP"),
        end: new Date(targetItem.ending_time).toLocaleString("jp-JP"),
        name: targetItem.name,
        grpname: targetItem.grpname,
        color: targetItem.color,
        desc: targetItem.desc,
        id: targetItem.id,
      });
      setTooltipPos({
        x: e.pageX + 10,
        y: e.pageY - 20,
        visible: true,
      });
    }, 500);
  }

  // マウス通過終了時
  function onMouseOut(e) {
    if (!showTooltipAll) {
      setTooltipPos({
        x: e.pageX + 10,
        y: e.pageY - 20,
        visible: false,
      });
    }
  }

  function changeToolTipStatus (e) {
    if(tooltipPos.visible){
      setTooltipPos({
        x: tooltipPos.x,
        y: tooltipPos.y,
        visible: false,
      });
    } else {
      const targetItem = props.inputData.filter(
        (item) => item.id == e.target.getAttribute("id")
      )[0];
      // console.log(targetItem)
      setTooltipText({
        start: new Date(targetItem.starting_time).toLocaleString("jp-JP"),
        end: new Date(targetItem.ending_time).toLocaleString("jp-JP"),
        name: targetItem.name,
        grpname: targetItem.grpname,
        color: targetItem.color,
        desc: targetItem.desc,
        id: targetItem.id,
      });
      setTooltipPos({
        x: e.pageX + 10,
        y: e.pageY - 20,
        visible: true,
      });
    }
  }

  function onDbClick(e) {
    console.log("DbClick!!");
    if (showTooltipAll) {
      setShowTooltipAll(false);
    } else {
      setShowTooltipAll(true);
    }
  }

  function moveToCenter (e){
    setCordinate({
      x: cordinate.x + svgWidth / 2 - e.target.getAttribute("x") < 0 ? cordinate.x + svgWidth / 2 - e.target.getAttribute("x") : 0,
      y: cordinate.y + svgHeight / 2 - e.target.getAttribute("y") < 0 ? cordinate.y + svgHeight / 2 - e.target.getAttribute("y") : 0,
    });
  }



  // basic parameters
  const [svgWidth, setWidth] = useState(props.width ? props.width : 1350); //
  const [svgHeight, setHeight] = useState(props.height ? props.height : 650); //
  const plotStartX = 150;
  const plotStartY = 60;
  const py1 = 25;

  // graph parameter
  const [frameTimespan, setFrameTimespan] = useState(53200000); // 1フレームの時間（6時間分）
  const [gHeight, setGHeight] = useState(parseInt(20));
  const [fontSize, setFontSize] = useState(parseInt(gHeight));
  const [fontColor, setFontColor] = useState(
    props.fontColor ? props.fontColor : "Black"
  );
  const [fontBackColor, setFontBackColor] = useState(
    props.fontBackColor ? props.fontBackColor : "White"
  );

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

  useEffect(() => {
    if (props.width) {
      setWidth(props.width);
    }
  }, [props.width]);

  useEffect(() => {
    if (props.height) {
      setHeight(props.height);
    }
  }, [props.height]);

  // useEffect(()=>{
  //   if(props.searchText.text){
  //     console.log("SerchChange")
  //     console.log(props.searchText)
  //     console.log(props.inputData.filter((item)=>item[props.searchText.item]===props.searchText.text)[0])
  //     const searchResult = props.inputData.filter((item)=>item[props.searchText.item]===props.searchText.text)[0];
  //     console.log(plotArray.filter((item)=>item.id===searchResult.id))
  //   }
  // },[props.searchText.text])

  // 先にplotArrayにしてデータを絞りたいけど、データ生成に必要なので、ここは断念。
  // データをParseするときにMinを算出するように変更。
  const minTimeStamp = (props.minStart ? props.minStart :
    Math.floor(
      Math.min(
        ...props.inputData
          .map((item) => parseInt(item.starting_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000)

  // console.log("Render PlotArea");
  // console.log(props.inputData)
  // console.log(props.colorSelected)
  // filerを先にかませてデータを絞る。
  const plotArray = props.inputData
    .filter(
      (item) =>
        // (props.filterText.text
        //   ? item[props.filterText.item] === props.filterText.text
        //   : true) &&
        (item.starting_time - minTimeStamp) * scaleFactor + cordinate.x <
          svgWidth &&
        (item.ending_time - minTimeStamp) * scaleFactor + cordinate.x > 0 &&
        gMargin * (parseInt(item.group) - 1 / 2) +
          gHeight * (parseInt(item.lane) - 1) +
          cordinate.y <
          svgHeight - plotStartY &&
        gMargin * (parseInt(item.group) - 1 / 2) +
          gHeight * parseInt(item.lane) +
          cordinate.y >
          0
    )
    .map((item) => ({
      key: item.id,
      length: (item.ending_time - item.starting_time) * scaleFactor,
      cx:
        (item.starting_time - minTimeStamp) * scaleFactor +
        plotStartX +
        cordinate.x,
      cy:
        gMargin * (parseInt(item.group) - 1 / 2) +
        gHeight * (parseInt(item.lane) - 1) +
        plotStartY +
        cordinate.y,
      barColor:
        item[props.searchText.item] === props.searchText.text
          ? "Red"
          : props.colorSelected.find((color) => color.name == item.color).value,
      name: item.name,
      grpname: item.grpname,
      color: item.color,
      desc: item.desc,
      starting_time: item.starting_time,
      ending_time: item.ending_time,
      group: item.group,
      lane: item.lane,
    }));

  // 先にplotArrayにしてデータを絞ることでパフォーマンスを上げたい
  const maxTimeStamp =
    Math.ceil(
      Math.max(
        ...plotArray
          .map((item) => parseInt(item.ending_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000;

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
          (currentTime - minTimeStamp) * scaleFactor + plotStartX + cordinate.x,
        cy: 25,
        labelD: `${dates}`,
        labelT: `${hours}`,
        hour:currentTime.getHours(),
      };
    }
  ).filter(
    (item) =>
      item.cx < svgWidth - plotStartX &&
      item.cx > 0 &&
      item.cy < svgHeight - plotStartY &&
      item.cy > 0
  );
  const xAxisArrayMinKey = Math.min.apply(null,xAxisArray.map((item) => (item.key)));
  const xAxisArrayMinHour = Math.min.apply(null,xAxisArray.map((item) => (item.hour)));
  // console.log(xAxisArrayMinKey)
  // console.log(xAxisArrayMinHour)


  function makeyAxisArray(inputData, g_margin, g_height, plotStartY, ty) {
    //縦軸のラベル用データ作成
    const recordsArray = {};
    for (const item of inputData) {
      // 配列をループ
      const group = parseInt(item.group);
      const lane = parseInt(item.lane);
      if (
        !recordsArray[group] ||
        (lane < recordsArray[group].lane &&
          g_margin * (group - 1) + g_height * (lane - 1) + ty <
            svgHeight - plotStartY &&
          g_margin * (group - 1) + g_height * (lane - 1) + ty >= 0)
      ) {
        // Groupごとに最小のkeyの値を更新
        recordsArray[group] = {
          key: group,
          group: item.grpname,
          lane: lane,
          coord: "yAxis",
          cx: 10,
          cy: g_margin * (group - 1) + g_height * (lane - 1) + plotStartY + ty,
        };
      }
    }
    const resultArray = Object.values(recordsArray); // 結果を配列に変換
    return resultArray;
  }

  const yAxisArray = makeyAxisArray(
    plotArray,
    gMargin,
    gHeight,
    plotStartY,
    cordinate.y
  );

  console.log(
    "=== RENDER PLOT AREA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  // console.log(plotArray)
  // console.log(new Date(minTimeStamp).toLocaleString("ja-JP"))
  // console.log(new Date(maxTimeStamp).toLocaleString("ja-JP"))
  // console.log(Math.ceil((maxTimeStamp - minTimeStamp) / xAxisTimespan) )
  // console.log("PlotArray")
  // console.log(plotArray)
  // console.log("yAxisArray")
  // console.log(xAxisArray)
  // console.log(yAxisArray)

  return (
    <div>
      {/* <svg width={svgWidth} height={svgHeight} fill="#5FC2C0"> */}
      <svg
        width={svgWidth}
        height={svgHeight}
        fill="#EDEDED"
        style={{ cursor: isMouseDown ? "all-scroll" : "default" }}
      >
        <g id="plotArea-group" transform={`translate(0,0)`}>
          <defs>
            <clipPath id="plotArea-clip">
              <rect x="0" y="0" width={svgWidth} height={svgHeight}></rect>
            </clipPath>
          </defs>
          <rect
            className="plotArea drag-handler"
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          />
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
                onClick={changeToolTipStatus}
                // onClick={moveToCenter}
                // onClick={onMouseOver}
                // onMouseOver={onMouseOver}
                // onMouseOut={onMouseOut}
                // tooltipPos={tooltipPos}
              />
            );
          })}
          <rect
            x="0"
            y="0"
            height={plotStartY}
            width={svgWidth}
            fill={fontBackColor}
            fillOpacity="0.5"
          ></rect>
          <rect
            x="0"
            y="0"
            height={svgHeight}
            width={plotStartX}
            fill={fontBackColor}
            fillOpacity="0.5"
          ></rect>
          {xAxisArray.map((item) => {
            return (
              (item.key === xAxisArrayMinKey || item.hour === xAxisArrayMinHour) &&
              <text
                key={item.key}
                className="xAxis1 marker-label "
                x={item.cx}
                y={item.cy}
                fill={fontColor}
                style={{ fontSize: fontSize, fontWeight: "bold" }}
              >
                {item.labelD}
              </text>
            );
          })}
          {xAxisArray.map((item) => {
            return (
              <text
                key={item.key}
                className="xAxis1 marker-label "
                x={item.cx}
                y={item.cy + fontSize}
                fill={fontColor}
                style={{ fontSize: fontSize, fontWeight: "bold" }}
              >
                {item.labelT}
              </text>
            );
          })}
          {yAxisArray.map((item) => {
            return (
              <text
                key={item.key}
                className="yAxis marker-label"
                x={item.cx}
                y={item.cy + fontSize}
                fill={fontColor}
                style={{ fontSize: fontSize, fontWeight: "bold" }}
              >
                {item.group}
              </text>
            );
          })}
        </g>
      </svg>
      {tooltipPos.visible && (
        <div
          className="tooltip"
          style={{ top: tooltipPos.y + "px", left: tooltipPos.x + "px" }}
        >
          {tooltipText.start && "START:" + tooltipText.start}
          {tooltipText.start && <br />}
          {tooltipText.end && "END:" + tooltipText.end}
          {tooltipText.end && <br />}
          {tooltipText.name && "NAME:" + tooltipText.name}
          {tooltipText.name && <br />}
          {tooltipText.grpname && "GRPNAME:" + tooltipText.grpname}
          {tooltipText.grpname && <br />}
          {tooltipText.color && "COLOR:" + tooltipText.color}
          {tooltipText.color && <br />}
          {tooltipText.desc && "DESC:" + tooltipText.desc}
          {tooltipText.desc && <br />}
          {tooltipText.id && "ID:" + tooltipText.id}
          {tooltipText.id && <br />}
        </div>
      )}
    </div>
  );
});
