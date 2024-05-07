import {
  OpenLocalFile,
  ParseDateCol,
  ParseCSV,
  ConvertData,
  ConvertTimelineData,
} from "./DataControl";

export const HeaderFromLocalFile = async function HeaderFromLocalFile(
  evt,
  setColSelector,
  setInputData
) {
  console.log(
    "=== GET LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try { 
    const inputData = await OpenLocalFile(evt);
    const parseData = await ParseCSV(inputData);
    // 項目名からcolSelectorを作成する。（各種設定ファイル作成に利用する。）
    setColSelector(
      Object.keys(parseData[0]).map((item, index) => ({
        id: index + 1,
        name: item,
        value: item,
        label: item,
      }))
    );

    setInputData(parseData);

  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawGraph = async function drawGraph(
  convDef,
  inputData,
  setInputData
) {
  console.log(
    "=== DRAW GRAPH START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  const parseData = await ParseDateCol(inputData, convDef);
  const convertData = await ConvertData(parseData, convDef);
  // filterData = FilterTimelineData(parseData);
  const timelineData = await ConvertTimelineData(convertData, convDef);
  setInputData(timelineData);
};

export const DrawFromLocalFile = async function drawFromLocalFile(
  evt,
  convDef,
  setInputData
) {
  console.log(
    "=== DRAW FROM LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try {
    const inputData = await OpenLocalFile(evt);
    const parseData = await ParseCSV(inputData, convDef);
    const parseDateData = await ParseDateCol(parseData, convDef);
    const convertData = await ConvertData(parseDateData, convDef);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setInputData(timelineData);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawNewProperty = async function drawNewProperty(
  convDef,
  inputData,
  setInputData
) {
  console.log(
    "=== CHANGE GROUP COL START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try {
    const convertData = await ConvertData(inputData, convDef);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setInputData(timelineData);
    // return timelineData
  } catch (error) {
    console.error("項目変更エラー：", error);
  }
};
