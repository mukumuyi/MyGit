import {
  ParseCSV,
  ParseDateCol,
  ParseCSV2,
  ConvertData,
  FilterTimelineData,
  ConvertTimelineData,
} from "./DataControl";

// ファイル読み込み時の操作
// fileを読み込む
// json形式にparseする
// 扱えるデータにconvertする
// データをFilterする
// データをTimeline向けに加工する。

export const GetHeaderFromLocalFile = async function getHeaderFromLocalFile(
  evt,setColSelector,setInputData) {
  console.log(
    "=== GET LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  const fileInput = evt.target;
  const file = fileInput.files[0];

  try {
    const inputData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });

    const parseData = await ParseCSV2(inputData);

    
    // 項目名からcolSelectorを作成する。（各種設定ファイル作成に利用する。）
    setColSelector(Object.keys(parseData[0]).map((item, index) => ({
      id: index + 1,
      name: item,
      value: item,
      label: item,
    })));

    setInputData(parseData)
    
    // const convertData = await ConvertData(parseData,convDef);
    // // filterData = FilterTimelineData(parseData);
    // const timelineData = await ConvertTimelineData(convertData,convDef);
    // setInputArray(timelineData);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawGraph = async function drawGraph(convDef,inputData,
  setInputArray){
    console.log(
      "=== DRAW GRAPH START  :",
      new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
      "==="
    );
    console.log(convDef)


    const parseData = await ParseDateCol(inputData,convDef)
    const convertData = await ConvertData(parseData, convDef);
    // filterData = FilterTimelineData(parseData);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setInputArray(timelineData);
}

export const DrawFromLocalFile = async function drawFromLocalFile(
  evt,
  convDef,
  setInputArray
) {
  console.log(
    "=== GET LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  const fileInput = evt.target;
  const file = fileInput.files[0];

  try {
    const inputData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
    const parseData = await ParseCSV(inputData, convDef);
    const convertData = await ConvertData(parseData, convDef);
    // filterData = FilterTimelineData(parseData);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setInputArray(timelineData);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

export const DrawNewProperty = async function drawNewProperty(
  convDef,
  inputData,
  setInputArray
) {
  console.log(
    "=== CHANGE GROUP COL START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  try {
    const convertData = await ConvertData(inputData, convDef);
    const timelineData = await ConvertTimelineData(convertData, convDef);
    setInputArray(timelineData);
    // return timelineData
  } catch (error) {
    console.error("項目変更エラー：", error);
  }
};

function drawFromHttpFile() {
  console.log(
    "=== GET HTTP FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  // CSVファイルを取得
  let reqHttp = new XMLHttpRequest();
  // let inputData = []; // 配列を定義
  // console.log($("#FileDirectory").get(0).value)
  reqHttp.open("GET", $("#FileDirectory").get(0).value, false); // CSVファイルへのパス
  try {
    // csvファイル読み込み失敗時のエラー対応
    reqHttp.send(null);
  } catch (err) {
    console.log(err);
  }
  inputData = reqHttp.responseText;
  parseData = parseCSV(inputData);
  console.log(parseData);
  filterData = filterTimelineData(parseData);
  timelineData = convertTimelineData(filterData);
  drawTimelineChart(timelineData);
}

function drawFromDBFile(inpuData) {
  console.log("InputData", inpuData);
}

function drawTimelineChart(timelineData) {
  const timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得

  if (timeline1Element) {
    // もし要素が存在する場合は削除
    timeline1Element.innerHTML = "";
  } else {
    console.error("Element with id 'timeline1' not found.");
  }

  timeline(timelineData, dynaParm.curTimeSpan, dynaParm.curBarWidth);
}

function changeDynaParm(procPtn) {
  console.log(
    "=== CHANGE DYNAMIC PARAMETER START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  const timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得
  dynaParm = {
    curInFileMethodType: $("#InputDataType").get(0).value,
    curReqUrl: $("#FileDirectory").get(0).value,
    curStaColumn: $("#StartColumn").get(0).value,
    curStaDType: $("#StartDateType").get(0).value,
    curEndColumn: $("#EndColumn").get(0).value,
    curEndDType: $("#EndDateType").get(0).value,
    curGrpNameColumn: $("#GroupNameColumn").get(0).value,
    curRecNameColumn: $("#RecordNameColumn").get(0).value,
    curCommentColumn: $("#CommentColumn").get(0).value,
    curTimeSpan: parseInt($("input:radio[name=TimeSpanSetting]:checked").val()),
    curBarWidth: parseInt($("input:radio[name=BarWidthSetting]:checked").val()),
    curColorColumn: $("#ColorColumn").get(0).value,
    curBarFlameColor: $("#BarFlameColor").get(0).value,
    curSepLineColor: $("#SeparatorLineColor").get(0).value,
    curFilterColumn: $("#FilterColumn").get(0).value,
    curFilterText: $("#FilterText").get(0).value,
    curSearchColumn: $("#SearchColumn").get(0).value,
    curSearchText: $("#SearchText").get(0).value,
  };

  if (procPtn === "F") {
    filterData = filterTimelineData(parseData);
    timelineData = convertTimelineData(filterData);
  } else if (procPtn === "C") {
    timelineData = convertTimelineData(filterData);
  }
  drawTimelineChart(timelineData);
}

let tx = 0;
let ty = 0;
let inputData;
let parseData;
let filterData;

//Set Dynamic Parameter
let dynaParm = {
  curInFileMethodType: "",
  curReqUrl: "",
  curStaColumn: "",
  curStaDType: "",
  curEndColumn: "",
  curEndDType: "",
  curGrpNameColumn: "",
  curRecNameColumn: "",
  curCommentColumn: "",
  curTimeSpan: "",
  curBarWidth: "",
  curColorColumn: "",
  curBarFlameColor: "",
  curSepLineColor: "",
  curFilterColumn: "",
  curFilterText: "",
  curSearchColumn: "",
  curSearchText: "",
};

function init(inputJson) {
  console.log(
    "=== INITIAL START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  //Set Static Parameter
  if ($("#SetSettingFile").get(0)) {
    console.log("===  ->ClientMode               ===");
    console.log(
      "===  SET STATIC PARAM :",
      new Date().toLocaleTimeString("it-IT"),
      " ==="
    );
    setStaticParam();
  } else {
    console.log("===  ->ServerMode               ===");
  }

  console.log(
    "===  SET DYNAMIC PARAM :",
    new Date().toLocaleTimeString("it-IT"),
    " ==="
  );

  //Control Visvible
  fileMethodVisible();

  //Set Dynamic Parameter
  dynaParm = {
    curInFileMethodType: $("#InputDataType").get(0).value,
    curReqUrl: $("#FileDirectory").get(0).value,
    curStaColumn: $("#StartColumn").get(0).value,
    curStaDType: $("#StartDateType").get(0).value,
    curEndColumn: $("#EndColumn").get(0).value,
    curEndDType: $("#EndDateType").get(0).value,
    curGrpNameColumn: $("#GroupNameColumn").get(0).value,
    curRecNameColumn: $("#RecordNameColumn").get(0).value,
    curCommentColumn: $("#CommentColumn").get(0).value,
    curTimeSpan: parseInt($("input:radio[name=TimeSpanSetting]:checked").val()),
    curBarWidth: parseInt($("input:radio[name=BarWidthSetting]:checked").val()),
    curColorColumn: $("#ColorColumn").get(0).value,
    curBarFlameColor: $("#BarFlameColor").get(0).value,
    curSepLineColor: $("#SeparatorLineColor").get(0).value,
    curFilterColumn: $("#FilterColumn").get(0).value,
    curFilterText: $("#FilterText").get(0).value,
    curSearchColumn: $("#SearchColumn").get(0).value,
    curSearchText: $("#SearchText").get(0).value,
  };

  //Load Timeline Data
  // if (inputJson){
  //   console.log(inputJson)
  //   // drawFromDBFile(inputJson);
  // } else
  if (dynaParm.curInFileMethodType === "http") {
    //Load Timeline Data
    //Draw Timeline Chart
    drawFromHttpFile();
  } else {
    //Load Timeline Data
    //Draw Timeline Chart
    drawFromLocalFile();
  }
  console.log(
    "=== INITIAL END  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
}
