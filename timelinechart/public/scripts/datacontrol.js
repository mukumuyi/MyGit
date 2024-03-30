function parseCSV(csvData) {
  console.log("=== PARSE CSV START  :",new Date().toLocaleTimeString("it-IT"),"===");
  const startColumn = dynaParm.curStaColumn; //Get StartColumnName from html
  const endColumn = dynaParm.curEndColumn; //Get endColumnName from html
  // CSVデータを行ごとに分割し、各行をカンマで分割して配列に格納する
  let lines = csvData.split(/\r\n|\n/);
  const header = lines[0].split(","); // 先頭行をヘッダとして格納
  lines.shift(); // 先頭行の削除
  lines = lines.filter((line) => line.length > 1);

  csvArray = lines.map((item) => {
    let datas = item.split(",");
    let result = {};

    if(datas.length>1){
      
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];
    }

    if(result[startColumn].indexOf(':') < 0)
    {
      result.starting_time = parseInt(result[startColumn])
    } else {
      result.starting_time =Date.parse(result[startColumn])
    }

    if(result[endColumn].indexOf(':') < 0)
    {
      result.ending_time = parseInt(result[endColumn])
    } else {
      result.ending_time =Date.parse(result[endColumn])
    }

    }

    return result;
  });
  
  return csvArray;
}


function convertData(inData) {
  console.log("=== MAKE TIMELINE DATA START  :",new Date().toLocaleTimeString("it-IT"),"===");
  const groupColumn = dynaParm.curGrpNameColumn; //Get GroupColumnName from html
  const startColumn = dynaParm.curStaColumn; //Get StartColumnName from html
  const endColumn = dynaParm.curEndColumn; //Get endColumnName from html

  // データを並び替える。（ソートキーはグループと"starting_time"）
  inData.sort((a, b) => {
    if (a[groupColumn] !== b[groupColumn]) {
      return a[groupColumn] < b[groupColumn] ? -1 : 1;
    }
    return a[startColumn] - b[startColumn];
  });
  
  // グループ・レーンの連番を振る
  let laneArray = [];
  let preGroup = '';
  let i = 0;
  let j = 0;

  laneArray.push({ totalLane: 0, lane: 0, endingTime: 0 });

  inData.forEach(item => {
    const group = item[groupColumn];
    const start = item[startColumn];
    const end = item[endColumn];

    if (group != preGroup) {
      i = i + 1;
      j = j + 1;
      laneArray = [];
      laneArray.push({ totalLane: j, lane: 0, endingTime: 0 });
    }
    item["group"] = i;

    for (var k = 0; k < laneArray.length; k++) {
      if (
        laneArray[k].endingTime < start 
      ) {
        laneArray[k].endingTime = end;
        item["lane"] = laneArray[k].totalLane;
        break;
      }
      if (k + 1 === laneArray.length) {
        j = j + 1
        let laneRecord = {
          totalLane: j,
          lane: k + 1,
          endingTime: end,
        };
        laneArray.push(laneRecord);
        item["lane"] = j;
        break;
      }
    }
    preGroup = group

  });

  return inData;
}
