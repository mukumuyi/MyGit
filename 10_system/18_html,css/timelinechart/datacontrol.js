function parseCSV(csvData) {
  // CSVデータを行ごとに分割し、各行をカンマで分割して配列に格納する
  const lines = csvData.split(/\r\n|\n/);
  const header = lines[0].split(","); // 先頭行をヘッダとして格納
  lines.shift(); // 先頭行の削除
  const dataArray = [];

  csvArray = lines.map((item) => {
    let datas = item.split(",");
    let result = {};
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];
    }

    if(result[ $("#StartColumn").get(0).value].indexOf(':') < 0)
    {
      result.starting_time = parseInt(result[ $("#StartColumn").get(0).value])
    } else {
      result.starting_time =Date.parse(result[ $("#StartColumn").get(0).value])
    }

    if(result[$("#EndColumn").get(0).value].indexOf(':') < 0)
    {
      result.ending_time = parseInt(result[$("#EndColumn").get(0).value])
    } else {
      result.ending_time =Date.parse(result[$("#EndColumn").get(0).value])
    }

    return result;
  });
  return csvArray;
}


function convertData(indata) {
  // データの並び替え、グループの付与、レーンの付与（未実装）

  const groupColumn = $("#GroupColumn").get(0).value; //Get GroupColumnName from html
  const startColumn = $("#StartColumn").get(0).value; //Get StartColumnName from html
  const endColumn = $("#EndColumn").get(0).value; //Get endColumnName from html

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
