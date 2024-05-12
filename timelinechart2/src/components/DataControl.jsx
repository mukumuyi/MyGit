function parseDateTime(dateTimeString, dateType) {
  if (dateType === "YYYYMMDDHHmmSS") {
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hours = dateTimeString.slice(8, 10);
    const minutes = dateTimeString.slice(10, 12);
    const seconds = dateTimeString.slice(12, 14);
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return Date.parse(date);
  } else if (dateType === "UNIX" || !isNaN(dateTimeString)) {
    return parseInt(dateTimeString);
  } else if (dateType === "YYYY/MM/DD HH:mm:SS") {
    const parts = dateTimeString.split(" ");
    const datePart = parts[0].split("/");
    const timePart = parts[1].split(":");
    // Dateオブジェクトを作成
    const date = new Date(
      parseInt(datePart[0]), // 年
      parseInt(datePart[1]) - 1, // 月 (0-11)
      parseInt(datePart[2]), // 日
      parseInt(timePart[0]), // 時
      parseInt(timePart[1]) // 分
    );
    return Date.parse(date);
  } else {
    return Date.parse(dateTimeString); // デフォルトはISO 8601形式の日付文字列
  }
}

export const OpenLocalFile = async function openLocalFile(evt) {
  console.log(
    "=== OPEN LOCAL FILE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  const inputData = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(evt.target.files[0]);
  });

  return inputData;
};

export const ParseCSV = function parseCSV(inputData) {
  console.log(
    "=== PARSE CSV START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  // CSVデータを行ごとに分割し、各行をカンマで分割して配列に格納する
  const lines = inputData.split(/\r\n|\n/);
  const header = lines[0].split(","); // 先頭行をヘッダとして格納
  lines.shift(); // 先頭行の削除
  return lines
    .filter((line) => line.length > 1) // 空白行を除外
    .map((item) => {
      let datas = item.split(",");
      let result = {};
      let key;
      if (datas.length > 1) {
        for (const index in datas) {
          key = header[index];
          result[key] = datas[index];
        }
      }
      return result;
    });
};

export const ParseDateCol = function parseDateCol(inputData, convDef) {
  console.log(
    "=== PARSE DATE COLUMN   START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );
  return inputData.map((item) => {
    item.starting_time = parseDateTime(
      item[convDef.colStart],
      convDef.dateType
    );
    item.ending_time = parseDateTime(item[convDef.colEnd], convDef.dateType);
    return item;
  });
};

export const ConvertData = function convertDate(inputData, convDef) {
  console.log(
    "=== CONVERT DATA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  return inputData.map((item, index) => {
    return {
      ...item,
      id: index,
      name: item[convDef.colName],
      grpname: item[convDef.colGrp],
      desc: item[convDef.colDesc],
      color: item[convDef.colColor],
    };
  });
};

export const FilterData = function filterData(inputData, filterText) {
  console.log(
    "=== FILTER DATA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  let outData = [];  

  if (filterText.text) {
    outData = inputData.filter((item) =>
      item[filterText.item].match(
        RegExp("^" + filterText.text.replace(/\*/g, ".*") + "$")
      )
    );
  }

  if (outData.length === 0) {
    outData = inputData;
  }
  return outData;
};

export const ConvertTimelineData = function convertTimelineData(
  inputData,
  convDef
) {
  console.log(
    "=== MAKE TIMELINE DATA START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  // データを並び替える。（ソートキーはグループと"starting_time"）
  inputData.sort((a, b) => {
    if (a[convDef.colGrp] !== b[convDef.colGrp]) {
      return a[convDef.colGrp] < b[convDef.colGrp] ? -1 : 1;
    }
    return a[convDef.colStart] - b[convDef.colStart];
  });

  // グループ・レーンの連番を振る
  let laneArray = [];
  let preGroup = "";
  let i = 0;
  let j = 0;

  laneArray.push({ totalLane: 0, lane: 0, endingTime: 0 });

  inputData.forEach((item) => {
    const group = item[convDef.colGrp];
    const start = item[convDef.colStart];
    const end = item[convDef.colEnd];

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

  return inputData;
};
