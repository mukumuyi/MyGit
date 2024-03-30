function loadCSVData() {
  // CSVファイルを取得

  const requestURL = $("#FileDirectory").get(0).value; // Get File URL from html
  let csv = new XMLHttpRequest();
  let csvArray = []; // 配列を定義

  csv.open("GET", requestURL, false); // CSVファイルへのパス
  try {
    // csvファイル読み込み失敗時のエラー対応
    csv.send(null);
  } catch (err) {
    console.log(err);
  }

  csvArray = csv.responseText;
  return csvArray ;
}

// ローカルのcsvは読み込めるが、その後にチャートへ反映するのが難しい
function timelineLocal(Timespan, Height) {
  let fileInput = $("#FileDirectoryLocal").get(0);
  let file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const csvData = e.target.result;
      CsvToTimelineChart(csvData, Timespan, Height);
    } catch (error) {
      console.error("CSVファイルの読み込みエラー:", error);
    }
  };
  reader.readAsText(file);
}

// RadioBottomの値で表示期間を変える。
function getSelectedValue() {
  let formTimeSpan = $("#ChangeTimeSpan").get(0);
  let formBarWidth = $("#ChangeBarWidth").get(0);
  let selectedTimeSpan = null;
  let selectedBarWidth = null;

  let tx = $("#xTotalMove").val()
  let ty = $("#yTotalMove").val()

  for (var i = 0; i < formTimeSpan.TimeSpan.length; i++) {
    // Loop through radio buttons to find the selected one
    if (formTimeSpan.TimeSpan[i].checked) {
      selectedTimeSpan = parseInt(formTimeSpan.TimeSpan[i].value);
      break;
    }
  }

  for (var i = 0; i < formBarWidth.BarWidth.length; i++) {
    // Loop through radio buttons to find the selected one
    if (formBarWidth.BarWidth[i].checked) {
      selectedBarWidth = parseInt(formBarWidth.BarWidth[i].value);
      break;
    }
  }

  if (selectedTimeSpan !== null || selectedBarWidth !== null) {
    Main(selectedTimeSpan,selectedBarWidth);
  } else {
    alert("Please select a radio bottom");
  }
}

function FileMethodVisible() {
  if ($("#InputMethodType").get(0).value == "http") {
    $("#FileDirectoryLocal").hide();
    $("#FileDirectory").show(); 
  } else if ($("#InputMethodType").get(0).value == "local") {
    $("#FileDirectoryLocal").show();
    $("#FileDirectory").hide();
  }
}

function CsvToTimelineChart(csvData, frameTimespan, Height) {
  csvArray = parseCSV(csvData);
  csvArrayTemp = csvArray.filter(
    (item) =>
      item[$('#FilterItem').get(0).value].match(RegExp("^" + $('#FilterText').get(0).value.replace(/\*/g, ".*") + "$"))
  );
  if (csvArrayTemp.length !== 0) {
    csvArray = csvArrayTemp;
  }
  csvArray = convertData(csvArray);
  timeline(csvArray, frameTimespan, Height);
}

function Main(TimeSpan,Height) {
  FileMethodVisible();

  let timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得
  if (timeline1Element) {
    // もし要素が存在する場合は削除
    timeline1Element.innerHTML = "";
  } else {
    console.error("Element with id 'timeline1' not found.");
  }

  //  Input
  if ($("#InputMethodType").get(0).value == "http") {
    csvData = loadCSVData(); // Comment Out For Offline *******
    CsvToTimelineChart(csvData, TimeSpan, Height);
  } else {
    timelineLocal(TimeSpan, Height);
  }
}

const frameTimespan = 21600000; // 1フレームの時間（6時間分）
const Height = 20; // 1フレームの時間（6時間分）

let tx = 0;
let ty = 0;

let TempToday = new Date();
console.log('MAIN.js START:',TempToday.toLocaleTimeString("it-IT"));
getSelectedValue();

TempToday = new Date();
console.log('MAIN.js END:',TempToday.toLocaleTimeString("it-IT"));