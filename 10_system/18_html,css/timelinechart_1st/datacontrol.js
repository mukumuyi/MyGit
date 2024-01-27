function loadCSVData() {
  // CSVファイルを取得

  const requestURL = document.getElementById("FileDirectory").value; // Get File URL from html
  let csv = new XMLHttpRequest();
  let csvArray = []; // 配列を定義

  if (!requestURL) {
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

  console.log(requestURL);

  csv.open("GET", requestURL, false); // CSVファイルへのパス

  try {
    // csvファイル読み込み失敗時のエラー対応
    csv.send(null);
  } catch (err) {
    console.log(err);
  }

  let lines = csv.responseText.split(/\r\n|\n/); // 改行ごとに配列化
  let header = lines[0].split(","); // 先頭行をヘッダとして格納
  lines.shift(); // 先頭行の削除

  csvArray = lines.map((item) => {
    let datas = item.split(",");
    let result = {};
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];
    }
    return result;
  });
  return csvArray;
}

function converData(indata) {
  // データの並び替え、グループの付与、レーンの付与（未実装）

  const groupColumn = document.getElementById("GroupColumn").value; //Get GroupColumnName from html
  const startColumn = document.getElementById("StartColumn").value; //Get StartColumnName from html
  const endColumn = document.getElementById("EndColumn").value; //Get endColumnName from html

  // データを並び替える。（ソートキーはグループと"starting_time"）
  let outdata = indata.sort((a, b) => {
    if (a[groupColumn] < b[groupColumn]) {
      return -1;
    }
    if (a[groupColumn] > b[groupColumn]) {
      return 1;
    }
    if (a[startColumn] < b[startColumn]) {
      return -1;
    }
    if (a[startColumn] > b[startColumn]) {
      return 1;
    }
    return 0;
  });

  // グループ・レーンの連番を振る
  let countOfLabel = {};
  let laneArray = [];
  let i = 0;
  let j = 1;

  laneArray.push({ group: 0, lane: 0, endingTime: 0 });

  outdata.map((item, index, array) => {
    if (!countOfLabel[item[groupColumn]]) {
      i = i + 1;
      countOfLabel[item[groupColumn]] = i;
    }
    item["group"] = countOfLabel[item[groupColumn]];

    for (var k = 0; k < laneArray.length; k++) {
      if (
        laneArray[k].endingTime < item[startColumn] &&
        laneArray[k].group === item.group
      ) {
        laneArray[k].endingTime = item[endColumn];
        item["lane"] = k;
        break;
      }
      if (k + 1 === laneArray.length) {
        let laneRecord = {
          group: item["group"],
          lane: k + 1,
          endingTime: item[endColumn],
        };
        item["lane"] = k + 1;
        laneArray.push(laneRecord);
        break;
      }
    }

  });
  return outdata;
}
