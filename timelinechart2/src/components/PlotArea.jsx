import React, { useState, useRef } from "react";
import Rect from "./Rect";
import Line from "./Line";
import csvArray from "../csvArray";

export default function PlotArea(props) {
  // eventHandle
  const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const [gap, setGap] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const svgRef = useRef(null);

  // マウス押下時
  function onMouseDown(e) {
    setIsMouseDown(true);
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    setGap({ x: mouseX - 100 - cordinate.x, y: mouseY - 50 - cordinate.y });
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

      const relativeX = mouseX - 100;
      const relativeY = mouseY - 50;

      setCordinate({ x: relativeX - gap.x, y: relativeY - gap.y });
    }
  }

  // basic parameters
  const svgWidth = 1350;
  const svgHeight = 650;
  const plotStartX = 100;
  const plotStartY = 50;
  const py1 = 25;

  // graph parameter
  const frameTimespan = 21600000; // 1フレームの時間（6時間分）
  const gHeight = 20;
  const gMargin = gHeight / 4;
  const xAxisTimespan = frameTimespan / 6; // x軸の1目盛りの時間（1時間分）
  const scaleFactor = (1 / frameTimespan) * svgWidth;

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

  const plotArray = csvArray.map((item) => ({
    key: item.id,
    length: (item.ending_time - item.starting_time) * scaleFactor,
    cx: (item.starting_time - minTimeStamp) * scaleFactor + cordinate.x,
    cy:
      gMargin * (parseInt(item.group) - 1 / 2) +
      gHeight * (parseInt(item.lane) - 1) +
      cordinate.y,
    barColor: "blue",
  })).filter((item)=>item.cx < svgWidth - plotStartX && item.cx > 0 && item.cy < svgHeight - plotStartY && item.cy > 0);

  const xAxisArray = Array.from(
    { length: Math.ceil((maxTimeStamp - minTimeStamp) / xAxisTimespan) + 1 },
    (_, index) => {
      const currentTime = new Date(minTimeStamp + index * xAxisTimespan);
      const dates = currentTime.toLocaleDateString("ja-JP", {
        month: "numeric",
        day: "numeric",
      });
      const hours = currentTime.getHours();
      return {
        key: index,
        coord: "xAxis",
        cx:
          (currentTime - minTimeStamp) * scaleFactor +
          cordinate.x +
          cordinate.x,
        cy: 25,
        labelD: `${dates}`,
        labelT: `${hours}`,
      };
    }
  ).filter((item)=>item.cx < svgWidth - plotStartX && item.cx > 0 && item.cy < svgHeight - plotStartY && item.cy > 0);

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
          group: group,
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

  const yAxisArray = makeyAxisArray(csvArray, gMargin, gHeight, cordinate.y)
  .filter((item)=>item.cx < svgWidth - plotStartX && item.cx > 0 && item.cy < svgHeight - plotStartY && item.cy > 0);

  return (
    <g id="plotArea-group" transform={`translate(${plotStartX},${plotStartY})`}>
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
      />
      <g className="clipped-group" clipPath="url(#plotArea-clip)"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>
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
              x={item.cx}
              y={item.cy}
              height={gHeight}
              width={item.length}
              fill={item.barColor}
              stroke="green"
            />
          );
        })}
      </g>
    </g>
  );
}
