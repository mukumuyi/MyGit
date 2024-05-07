import fs from "fs";
import csv from "csvtojson"

function parseDateTime(dateTimeString, type) {
    if (type === "YYYYMMDDHHmmSS") {
      const year = dateTimeString.slice(0, 4);
      const month = dateTimeString.slice(4, 6);
      const day = dateTimeString.slice(6, 8);
      const hours = dateTimeString.slice(8, 10);
      const minutes = dateTimeString.slice(10, 12);
      const seconds = dateTimeString.slice(12, 14);
      const date = new Date(year, month - 1, day, hours, minutes, seconds);
      return Date.parse(date);
    } else if (type === "UNIX") {
      return parseInt(dateTimeString);
    } else if (type === "YYYY/MM/DD HH:mm:SS") {
      return Date.parse(dateTimeString);
    } else {
      return Date.parse(dateTimeString.replace(/-/g, "/")); // デフォルトはISO 8601形式の日付文字列
    }
  }

  function convertTimelineData(inData,colStart,colEnd,colGrp) {
    console.log(
      "=== MAKE TIMELINE DATA START  :",
      new Date().toLocaleTimeString("it-IT")+ "." + new Date().getMilliseconds(), "===");
  
    // データを並び替える。（ソートキーはグループと"starting_time"）
    inData.sort((a, b) => {
      if (a[colGrp] !== b[colGrp]) {
        return a[colGrp] < b[colGrp] ? -1 : 1;
      }
      return a[colStart] - b[colStart];
    });
  
    // グループ・レーンの連番を振る
    let laneArray = [];
    let preGroup = "";
    let i = 0;
    let j = 0;
  
    laneArray.push({ totalLane: 0, lane: 0, endingTime: 0 });
  
    inData.forEach((item) => {
      const group = item[colGrp];
      const start = item[colStart];
      const end = item[colEnd];
  
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
  

const csv2json = async (inputCsvPath, outputJsonPath,colStart,colEnd,colGrp,dateType) => {
    // CSVを配列として読み込み
    const jsonArray = await csv().fromFile(inputCsvPath);
    // ここで配列を加工してもOK
    // console.log(jsonArray);
    const jsonArrayWithIds = jsonArray
    .filter((item) => item[colStart] != item[colEnd])
    // .filter((item) => item.length > 1)
    .map((item, index) => {
        item.starting_time = parseDateTime(
            item[colStart],
            dateType
          );
          item.ending_time = parseDateTime(
              item[colEnd],
              dateType
            );
        return { ...item, id: index + 1 ,name:item[colName],grpname:item[colGrp] ,desc:item[colDesc],color:item[colColor]};
    });

    const jsonArrayWithIds2 = convertTimelineData(jsonArrayWithIds,colStart,colEnd,colGrp)
  
    // 配列をJSONに変換
    const jsonIndent = 2;
    const jsonStr = JSON.stringify(jsonArrayWithIds2, undefined, jsonIndent);
  
    // console.log("const csvArray = " + jsonStr + "; \n export default csvArray");
    // ファイルに出力
    fs.writeFileSync(outputJsonPath, jsonStr);
  }
  
  /* メイン処理 */
  
  // 基本定義
  const dir = "../../90_data/";
  const file = "TEST_DATA3.csv";
  const targetJsonPath = "./csvArray.json";
  const colStart = "starting_time";
  const colEnd = "ending_time";
  const colName = "name";
  const colGrp = "label";
  const colColor = "status";
  const colDesc = "label";
  const dateType = "YYYY/MM/DD HH:mm:SS";
  
  // 実行
  csv2json(dir + file, targetJsonPath,colStart,colEnd,colGrp,dateType);

  export default csv2json;