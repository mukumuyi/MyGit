async function drawFromLocalFile() {
  console.log("=== GET LOCAL FILE START  :",new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");
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
    parseData = parseCSV(inputData);
    filterData = filterTimelineData(parseData);
    timelineData = convertTimelineData(filterData);
    drawTimelineChart(timelineData);
  } catch (error) {
    console.error("CSVファイルの読み込みエラー:", error);
  }
};

function drawFromHttpFile() {
  console.log("=== GET HTTP FILE START  :",new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");
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
};

function drawFromDBFile(inpuData) {
  console.log('InputData',inpuData);
}

function drawTimelineChart(timelineData) {
  
  const timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得

  if (timeline1Element) {
    // もし要素が存在する場合は削除
    timeline1Element.innerHTML = "";
  } else {
    console.error("Element with id 'timeline1' not found.");
  };

  timeline(timelineData, dynaParm.curTimeSpan, dynaParm.curBarWidth);
};

function changeDynaParm(procPtn) {
  console.log("=== CHANGE DYNAMIC PARAMETER START  :",new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");
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

  if(procPtn=== 'F' ){
    filterData = filterTimelineData(parseData);
    timelineData = convertTimelineData(filterData);
  } else if (procPtn=== 'C' ){  
    timelineData = convertTimelineData(filterData);
  };
  drawTimelineChart(timelineData);
};

let tx = 0;
let ty = 0;
let inputData;
let parseData;
let filterData;

//Set Dynamic Parameter
let dynaParm = {
  curInFileMethodType: "",
  curReqUrl:"" ,
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

  console.log("=== INITIAL START  :",new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");

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
  if (dynaParm.curInFileMethodType === 'http') {
    //Load Timeline Data
    //Draw Timeline Chart
    drawFromHttpFile();
  } else {
    //Load Timeline Data
    //Draw Timeline Chart
    drawFromLocalFile();
  }
  console.log("=== INITIAL END  :",new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");
  
  
}