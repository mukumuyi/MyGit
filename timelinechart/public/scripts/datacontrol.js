function parseDateTime(dateTimeString, type) {
  if (type === "YYYYMMDDHHmmSS") {
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hours = dateTimeString.slice(8, 10);
    const minutes = dateTimeString.slice(10, 12);
    const seconds = dateTimeString.slice(12, 14);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  } else if (type === "UNIX") {
    return parseInt(dateTimeString);
  } else if (type === "YYYY/MM/DD HH:mm:SS") {
    return Date.parse(dateTimeString);
  } else {
    return Date.parse(dateTimeString.replace(/-/g, "/")); // デフォルトはISO 8601形式の日付文字列
  }
}

function parseCSV(csvData) {
  console.log(
    "=== PARSE CSV START  :",
    new Date().toLocaleTimeString("it-IT"),
    "==="
  );
  const startColumn = dynaParm.curStaColumn; //Get StartColumnName from html
  const endColumn = dynaParm.curEndColumn; //Get endColumnName from html
  // CSVデータを行ごとに分割し、各行をカンマで分割して配列に格納する
  let lines = csvData.split(/\r\n|\n/);
  const header = lines[0].split(","); // 先頭行をヘッダとして格納
  lines.shift(); // 先頭行の削除
  return lines
    .filter((line) => line.length > 1) // 空白行を除外
    .map((item) => {
      let datas = item.split(",");
      let result = {};

      if (datas.length > 1) {
        for (const index in datas) {
          let key = header[index];
          result[key] = datas[index];
        }

        result.starting_time = parseDateTime(
          result[startColumn],
          dynaParm.curStaDType
        );
        result.ending_time = parseDateTime(
          result[endColumn],
          dynaParm.curEndDType
        );
      }

      return result;
    });
}

function filterTimelineData(inData) {
  console.log(
    "=== FILTER DATA START  :",
    new Date().toLocaleTimeString("it-IT"),
    "==="
  );

  let outData = inData.filter((item) =>
    item[dynaParm.curFilterColumn].match(
      RegExp("^" + dynaParm.curFilterText.replace(/\*/g, ".*") + "$")
    )
  );
  if (outData.length === 0) {
    outData = inData;
  }
  return outData;
}

function convertTimelineData(inData) {
  console.log(
    "=== MAKE TIMELINE DATA START  :",
    new Date().toLocaleTimeString("it-IT"),
    "==="
  );
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
  let preGroup = "";
  let i = 0;
  let j = 0;

  laneArray.push({ totalLane: 0, lane: 0, endingTime: 0 });

  inData.forEach((item) => {
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
      if (laneArray[k].endingTime < start) {
        laneArray[k].endingTime = end;
        item["lane"] = laneArray[k].totalLane;
        break;
      }
      if (k + 1 === laneArray.length) {
        j = j + 1;
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
    preGroup = group;
  });

  return inData;
}
