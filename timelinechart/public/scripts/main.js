async function drawFromLocalFile() {
  console.log("=== GET LOCAL FILE START  :",new Date().toLocaleTimeString("it-IT"),"===");
  let fileInput = $("#FileDirectoryLocal").get(0);
  let file = fileInput.files[0];
  // let inputData = "";
  try {
    // csvData = await readFile(file);
    inputData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
    CsvToTimelineChart(inputData, dynaParm);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

function drawFromHttpFile() {
  console.log("=== GET HTTP FILE START  :",new Date().toLocaleTimeString("it-IT"),"===");
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
  CsvToTimelineChart(inputData, dynaParm);
};

function CsvToTimelineChart(inputData, dynaParm) {
  console.log("=== TRANSFER DATA START  :",new Date().toLocaleTimeString("it-IT"),"===");
  const timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得
  let parseDataTemp;
  parseData = parseCSV(inputData);
  parseDataTemp = parseData.filter(
    (item) =>
      item[dynaParm.curFilterColumn].match(RegExp("^" + dynaParm.curFilterText.replace(/\*/g, ".*") + "$"))
  );
  if (parseDataTemp.length !== 0) {
    parseData = parseDataTemp;
  }
  timelineData = convertData(parseData,dynaParm);

  if (timeline1Element) {
    // もし要素が存在する場合は削除
    timeline1Element.innerHTML = "";
  } else {
    console.error("Element with id 'timeline1' not found.");
  };

  timeline(timelineData, dynaParm.curTimeSpan, dynaParm.curBarWidth);
};

function changeDynaParm() {
  console.log("=== CHANGE DYNAMIC PARAMETER START  :",new Date().toLocaleTimeString("it-IT"),"===");
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

  timelineData = convertData(parseData,dynaParm);

  if (timeline1Element) {
    // もし要素が存在する場合は削除
    timeline1Element.innerHTML = "";
  } else {
    console.error("Element with id 'timeline1' not found.");
  };

  timeline(timelineData, dynaParm.curTimeSpan, dynaParm.curBarWidth);

};

let tx = 0;
let ty = 0;
let inputData;
let parseData;

console.log("=== INITIAL START  :",new Date().toLocaleTimeString("it-IT")," ===");

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
let dynaParm = {
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
if (dynaParm.curInFileMethodType === 'http') {
  //Load Timeline Data
  //Draw Timeline Chart
  drawFromHttpFile();
} else {
  //Load Timeline Data
  //Draw Timeline Chart
  drawFromLocalFile();
}
console.log("=== INITIAL END  :",new Date().toLocaleTimeString("it-IT")," ===");

