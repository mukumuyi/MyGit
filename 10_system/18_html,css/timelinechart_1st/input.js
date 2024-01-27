function loadCSVData() {
    // CSVファイルを取得
    let csv = new XMLHttpRequest();
    let csvArray = []; // 配列を定義
    

    csv.open("GET", requestURL, false); // CSVファイルへのパス
    
    try {      // csvファイル読み込み失敗時のエラー対応
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
  };

function converData(indata) {
    const groupColumn = document.getElementById('GroupColumn').value;    
    let outdata = indata.sort((a,b) => {
        if (a[groupColumn] < b[groupColumn]) { return -1; }
        if (a[groupColumn] > b[groupColumn]) { return 1; }
        if (a['starting_time'] < b['starting_time']) { return -1; }
        if (a['starting_time'] > b['starting_time']) { return 1; }
        return 0
    })

    // グループの連番を振る
    let countOfLabel = {};
    let i = 0;
    
    outdata.map(item => {
        if (!countOfLabel[item[groupColumn]]) {
            i = i + 1;
            countOfLabel[item[groupColumn]] = i;
        }

        item["group"] = countOfLabel[item[groupColumn]]
      });

    console.log(outdata)

    return outdata
 }

const requestURL = document.getElementById('FileDirectory').value;
console.log(requestURL);

csvArray = loadCSVData();

csvArray2 = converData(csvArray);

console.log("ReadData")
console.log(typeof(csvArray))
console.log(csvArray2)