// ローカルのcsvは読み込めるが、その後にチャートへ反映するのが難しい
function timelineLocal(frameTimespan,g_height) {
  let fileInput = $("#FileDirectoryLocal").get(0);
  let file = fileInput.files[0];
  const reader = new FileReader();
  
  if (!frameTimespan) {
    frameTimespan = 21600000; // 1フレームの時間（6時間分）
  }
  if (!g_height) {
    g_height = 20; // 1フレームの時間（6時間分）
  }

  if (!fileInput) {
    csvArray = [
      {
        label: "person_a",
        class: "a",
        status: "Run",
        name: "test1",
        color: "green",
        group: "1",
        lane: "1",
        starting_time: "1703808000000",
        ending_time: "1703814500000",
      },
      {
        label: "person_a",
        class: "a",
        status: "Wait",
        name: "test2",
        color: "blue",
        group: "1",
        lane: "1",
        starting_time: "1703850510000",
        ending_time: "1703870010000",
      },
      {
        label: "person_a",
        class: "a",
        status: "Fix",
        name: "test5",
        color: "red",
        group: "1",
        lane: "2",
        starting_time: "1703809000000",
        ending_time: "1703819900000",
      },
      {
        label: "person_b",
        class: "b",
        status: "Run",
        name: "test3",
        color: "pink",
        group: "2",
        lane: "3",
        starting_time: "1703807000000",
        ending_time: "1703808990000",
      },
      {
        label: "person_c",
        class: "c",
        status: "Run",
        name: "test4",
        color: "yellow",
        group: "3",
        lane: "4",
        starting_time: "1703808000000",
        ending_time: "1703810000000",
      },
    ];
    return csvArray;
  }
  reader.onload = (e) => {
    try {
      const csvData = e.target.result;
      let csvArray = parseCSV(csvData);
      let timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得
      if (timeline1Element) {
        // もし要素が存在する場合は削除
        timeline1Element.innerHTML = "";
      } else {
        console.error("Element with id 'timeline1' not found.");
      }
      csvArray = convertData(csvArray);
      timeline(csvArray,frameTimespan,g_height);
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
  let csvArray = [];

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
    var timeline1Element = $("#graph").get(0); // id="timeline1"の要素を取得
    if (timeline1Element) {
      // もし要素が存在する場合は削除
      timeline1Element.innerHTML = "";
    } else {
      console.error("Element with id 'timeline1' not found.");
    }
    
    // console.log($("#InputMethodType").get(0).value)
    if ($("#InputMethodType").get(0).value == "http") {
      csvArray = loadCSVData(); // Comment Out For Offline *******
      csvArray = convertData(csvArray);
      timeline(csvArray, selectedTimeSpan, selectedBarWidth);
    }
    if ($("#InputMethodType").get(0).value == "local") {
      timelineLocal(selectedTimeSpan, selectedBarWidth);
    }
  } else {
    alert("Please select a radio bottom");
  }
}

function FileMethodVisible () {
  if ($("#InputMethodType").get(0).value == "http") {
    $("#FileDirectoryLocal").hide();
    $("#FileDirectory").show();
  } else if  ($("#InputMethodType").get(0).value == "local") {
    $("#FileDirectoryLocal").show();
    $("#FileDirectory").hide();
  } 
}

const frameTimespan = 21600000; // 1フレームの時間（6時間分）
const g_height = 20; // 1フレームの時間（6時間分）

let TempToday = new Date();
let csvArray = [];

console.log(TempToday.toLocaleTimeString("it-IT"));

FileMethodVisible()
//  Input
csvArray = loadCSVData(); // Comment Out For Offline *******
csvArray = convertData(csvArray);
timeline(csvArray, frameTimespan, g_height);
