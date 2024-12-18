// inputに入力データ全体が入る
function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0

    // 1行目がinput[0], 2行目がinput[1], …に入る
    input = input.split("\n");
    const tmp = input[0].split(" ");
    // 	行・列定義を取得する。
    const H = parseInt(tmp[0], 10);
    const W = parseInt(tmp[1], 10);
    
    const rowSum = Array(H).fill(0);
    const colSum = Array(W).fill(0);

    let output = "";

    // 	二次元配列の初期化
    const inArray = Array.from({ length: H }, () => Array(W).fill(undefined));

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    // 二次元配列への取込と行/列集計
    // ループ１ 1行目～H行目まで
    for (let i = 1; i <= H; i++) {
      let line = input[i].split(" ");
      // ループ２ 1列目～W列目まで
      for (let j = 0; j < W; j++) {
          inArray[i - 1][j] = parseInt(line[j])
          rowSum[i - 1] += (inArray[i - 1][j])
          colSum[j] += (inArray[i - 1][j])
      }
  }

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");    
    
    for (let k = 0; k < H; k++) {
        let line = ""
        for (let l = 0; l < W; l++) {
            let sum = 0;
            sum = rowSum[k] + colSum[l] - inArray[k][l]
            line += sum
            line += " "
            // console.log(sum)
        }
        output += line.slice(0, line.length - 1)
        output += "\n"
    }

    
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    //出力
    console.log(output);
    // return output;
	
}
//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
Main(require("fs").readFileSync("/dev/stdin", "utf8"));