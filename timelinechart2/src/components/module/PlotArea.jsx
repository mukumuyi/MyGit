import React, { useState, useRef, useEffect, memo } from "react";

import Rect from "../atoms/Rect";
import Line from "../atoms/Line";
import ControlPanel from "../organism/ContolPanel";
import { DrawNewProperty } from "../module/DataInput";
import { BasicStyle, BasicProperty, ItemSelectDef } from "../Config";

export const PlotArea = memo((props) => {
  // props
  const {
    convDef,
    colorSelected,
    colSelector,
    inputData,
    minStart,
    originData,
    setColorSelected,
    setConvDef,
    // setDrawFlag,
    setInputData,
  } = props;

  // ** declare state **
  // graph parameter timeSelected
  const [fontSize, setFontSize] = useState(parseInt(BasicStyle.fontSize));
  const [fontColor, setFontColor] = useState(BasicStyle.fontColor);
  const [fontBackColor, setFontBackColor] = useState(
    BasicStyle.fontBackgroundColor,
  );

  // eventHandle
  const [svgSize, setSvgSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const [gap, setGap] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [tooltipText, setTooltipText] = useState({});
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [showTooltipAll, setShowTooltipAll] = useState(false);

  const [timeSelected, setTimeSelected] = useState(BasicProperty.timeSeleced);
  const [widthSelected, setWidthSelected] = useState(
    BasicProperty.widthSelected,
  );

  const [searchText, setSearchText] = useState({
    item: ItemSelectDef[0].name,
    text: null,
  });
  const [filterText, setFilterText] = useState({
    item: ItemSelectDef[0].name,
    text: null,
  });

  // ** declare constance **
  const itemSelector = ItemSelectDef;

  // basic parameters
  const plotStartX = 150;
  const plotStartY = 60;
  const py1 = 25;

  const gMargin = widthSelected / 4;
  const xAxisTimespan = timeSelected / 6; // x軸の1目盛りの時間（1時間分）
  const scaleFactor = (1 / timeSelected) * svgSize.width;

  const onChangeTime = (e) => {
    const { value } = e.target;
    setTimeSelected(value);
  };

  const onChangeWidth = (e) => {
    const { value } = e.target;
    setWidthSelected(value);
  };

  function handleSubmitSerch(e) {
    e.preventDefault();
    setSearchText({ item: e.target[0].value, text: e.target[1].value });
  }

  function handleSubmitFilter(e) {
    e.preventDefault();
    setFilterText({ item: e.target[0].value, text: e.target[1].value });
  }

  const onChangeCol = (e) => {
    const { name, value } = e.target;
    // setDrawFlag(false);
    setConvDef({ ...convDef, [name]: value });

    if (name === "colColor") {
      const uniqueStatusList = [
        ...new Set(inputData.map((item) => item[value])),
      ];
      const assignColor = (index, length) => {
        const hex = Math.floor(((index + 1) * 0xffffff) / length)
          .toString(16)
          .padStart(6, "0"); // インデックスに応じて色を計算
        return `#${hex.toUpperCase()}`; // #FFFFFF 形式の色コードを返す
      };

      setColorSelected(
        uniqueStatusList.map((item, index) => ({
          id: index + 1,
          name: item,
          value: assignColor(index, uniqueStatusList.length),
          label: item,
        })),
      );
    }
  };

  function onChangeColor(e) {
    const updatedColors = colorSelected.map((color) => {
      if (color.name === e.target.id) {
        // "Wait"の場合は新しい値に更新
        return { ...color, value: e.target.value };
      }
      return color;
    });

    // 更新された配列をセット
    setColorSelected(updatedColors);
  }

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

  // マウス通過時 idを取得して、inputDataの値をtooltipのテキストに渡す。
  function onMouseOver(e) {
    // console.log("Click Rect")
    if (mouseOverTimer) {
      clearTimeout(mouseOverTimer);
    }
    mouseOverTimer = setTimeout(() => {
      const targetItem = inputData.filter(
        (item) => item.id == e.target.getAttribute("id"),
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

  function changeToolTipStatus(e) {
    if (tooltipPos.visible) {
      setTooltipPos({
        x: tooltipPos.x,
        y: tooltipPos.y,
        visible: false,
      });
    } else {
      const targetItem = inputData.filter(
        (item) => item.id == e.target.getAttribute("id"),
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

  function moveToCenter(e) {
    setCordinate({
      x:
        cordinate.x + svgSize.width / 2 - e.target.getAttribute("x") < 0
          ? cordinate.x + svgSize.width / 2 - e.target.getAttribute("x")
          : 0,
      y:
        cordinate.y + svgSize.height / 2 - e.target.getAttribute("y") < 0
          ? cordinate.y + svgSize.height / 2 - e.target.getAttribute("y")
          : 0,
    });
  }

  let resizeTimer = "";
  window.onresize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      setSvgSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    }, 100);
  };

  useEffect(() => {
    if (fontColor) {
      setFontColor(fontColor);
    }
  }, [fontColor]);

  useEffect(() => {
    DrawNewProperty(convDef, originData, setInputData, filterText);
  }, [convDef, filterText.text]); // convDefが変更されたときだけこのuseEffectが実行される

  // 先にplotArrayにしてデータを絞りたいけど、データ生成に必要なので、ここは断念。
  // データをParseするときにMinを算出するように変更。
  const minTimeStamp = minStart
    ? minStart
    : Math.floor(
        Math.min(
          ...inputData
            .map((item) => parseInt(item.starting_time))
            .filter((value) => !isNaN(value)),
        ) / 3600000,
      ) * 3600000;

  console.log(colorSelected);
  console.log(inputData);
  // filerを先にかませてデータを絞る。
  const plotArray = inputData
    .filter(
      (item) =>
        (item.starting_time - minTimeStamp) * scaleFactor + cordinate.x <
          svgSize.width &&
        (item.ending_time - minTimeStamp) * scaleFactor + cordinate.x > 0 &&
        gMargin * (parseInt(item.group) - 1 / 2) +
          widthSelected * (parseInt(item.lane) - 1) +
          cordinate.y <
          svgSize.height - plotStartY &&
        gMargin * (parseInt(item.group) - 1 / 2) +
          widthSelected * parseInt(item.lane) +
          cordinate.y >
          0,
    )
    .map((item) => ({
      key: item.id,
      height: widthSelected,
      width: (item.ending_time - item.starting_time) * scaleFactor,
      x:
        (item.starting_time - minTimeStamp) * scaleFactor +
        plotStartX +
        cordinate.x,
      y:
        gMargin * (parseInt(item.group) - 1 / 2) +
        widthSelected * (parseInt(item.lane) - 1) +
        plotStartY +
        cordinate.y,
      fill:
        item[searchText.item] === searchText.text
          ? "Red"
          : colorSelected.find((color) => color.name == item.color).value,
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
          .filter((value) => !isNaN(value)),
      ) / 3600000,
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
        hour: currentTime.getHours(),
      };
    },
  ).filter(
    (item) =>
      item.cx < svgSize.width - plotStartX &&
      item.cx > 0 &&
      item.cy < svgSize.height - plotStartY &&
      item.cy > 0,
  );
  const xAxisArrayMinKey = Math.min.apply(
    null,
    xAxisArray.map((item) => item.key),
  );
  const xAxisArrayMinHour = Math.min.apply(
    null,
    xAxisArray.map((item) => item.hour),
  );
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
            svgSize.height - plotStartY &&
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
    widthSelected,
    plotStartY,
    cordinate.y,
  );

  console.log(
    "=== RENDER PLOT AREA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "===",
  );

  // console.log(plotArray);
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
      <ControlPanel
        colorSelected={colorSelected}
        colSelector={colSelector}
        convDef={convDef}
        filterText={filterText}
        handleSubmitSerch={handleSubmitSerch}
        handleSubmitFilter={handleSubmitFilter}
        itemSelector={itemSelector}
        onChangeCol={onChangeCol}
        onChangeColor={onChangeColor}
        onChangeTime={onChangeTime}
        onChangeWidth={onChangeWidth}
        searchText={searchText}
        setCordinate={setCordinate}
        setFilterText={setFilterText}
        setSearchText={setSearchText}
        timeSelected={timeSelected}
        widthSelected={widthSelected}
      />
      <svg
        width={svgSize.width}
        height={svgSize.height}
        fill="#EDEDED"
        style={{ cursor: isMouseDown ? "all-scroll" : "default" }}
      >
        <g id="plotArea-group" transform={`translate(0,0)`}>
          {/* <defs>
            <clipPath id="plotArea-clip">
              <rect x="0" y="0" width={svgWidth} height={svgHeight}></rect>
            </clipPath>
          </defs> */}
          <rect
            className="plotArea drag-handler"
            x="0"
            y="0"
            width={svgSize.width}
            height={svgSize.height}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseUp}
          />
          {xAxisArray.map((item) => (
            <Line
              key={item.key}
              x1={item.cx}
              y1="0"
              x2={item.cx}
              y2={svgSize.height}
            />
          ))}

          {yAxisArray.map((item) => (
            <Line
              key={item.key}
              x1="0"
              y1={item.cy}
              x2={svgSize.width}
              y2={item.cy}
            />
          ))}
          {plotArray.map((item) => (
            <Rect
              key={item.key}
              item={item}
              onClick={changeToolTipStatus}
              // onClick={moveToCenter}
              // onClick={onMouseOver}
              // onMouseOver={onMouseOver}
              // onMouseOut={onMouseOut}
              // tooltipPos={tooltipPos}
            />
          ))}
          <rect
            x="0"
            y="0"
            height={plotStartY}
            width={svgSize.width}
            fill={fontBackColor}
            fillOpacity="0.5"
          ></rect>
          <rect
            x="0"
            y="0"
            height={svgSize.height}
            width={plotStartX}
            fill={fontBackColor}
            fillOpacity="0.5"
          ></rect>
          {xAxisArray.map(
            (item) =>
              (item.key === xAxisArrayMinKey ||
                item.hour === xAxisArrayMinHour) && (
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
              ),
          )}
          {xAxisArray.map((item) => (
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
          ))}
          {yAxisArray.map((item) => (
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
          ))}
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
