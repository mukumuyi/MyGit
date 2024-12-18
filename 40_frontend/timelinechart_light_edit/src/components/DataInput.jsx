import {
  OpenLocalFile,
  ParseDateCol,
  ParseCSV,
  FilterData,
  ConvertData,
  ConvertTimelineData,
} from "./DataControl";

export const HeaderFromLocalFile = async function HeaderFromLocalFile(
  evt,
  setColSelector,
  setInputData,
  setOriginData
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
    await setColSelector(
      Object.keys(parseData[0]).map((item, index) => ({
        id: index + 1,
        name: item,
        value: item,
        label: item,
      }))
    );

    await setOriginData(parseData);
    await setInputData(parseData);

  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
    alert("ファイル取得エラーが発生しました。\n" + error)
  }
};


export const HeaderFromData = async function HeaderFromData(
  inputData,
  setColSelector,
  setInputData,
  setOriginData
) {
  console.log(
    "=== GET HEADER START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try { 
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

    setOriginData(parseData);
    setInputData(parseData);

  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawGraph = async function drawGraph(
  convDef,
  inputData,
  setInputData,
  setDrawFlag,
  setMinStart
) {
  console.log(
    "=== DRAW GRAPH START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  const [parseData,minStartingTime] = await ParseDateCol(inputData, convDef);
  const convertData = await ConvertData(parseData, convDef);
  const timelineData = await ConvertTimelineData(convertData, convDef);
  setMinStart(minStartingTime);
  setInputData(timelineData);
  setDrawFlag(true);
};

export const DrawFromLocalFile = async function drawFromLocalFile(
  evt,
  convDef,
  setInputData,
  setOriginData,
  setColSelector,
  setMinStart
) {
  console.log(
    "=== DRAW FROM LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try {
    const inputData = await OpenLocalFile(evt);
    const parseData = await ParseCSV(inputData);

    setColSelector(
      Object.keys(parseData[0]).map((item, index) => ({
        id: index + 1,
        name: item,
        value: item,
        label: item,
      }))
    );

    const [parseDateData,minStartingTime] = await ParseDateCol(parseData, convDef);
    const convertData = await ConvertData(parseDateData, convDef);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setMinStart(minStartingTime);
    setOriginData(parseDateData);
    setInputData(timelineData);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawNewProperty = async function drawNewProperty(
  convDef,
  originData,
  setInputData,
  setDrawFlag,
  filterText
) {
  console.log(
    "=== CHANGE GROUP COL START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try {
    const convertData = await ConvertData(originData, convDef);
    // console.log("== convert ==",convertData)
    
    const filterData = await FilterData(convertData,filterText)
    // console.log("== filter ==",filterData)
    const timelineData = await ConvertTimelineData(filterData, convDef);
    setInputData(timelineData);
    setDrawFlag(true);
    // return timelineData
  } catch (error) {
    console.error("項目変更エラー：", error);
  }
};
