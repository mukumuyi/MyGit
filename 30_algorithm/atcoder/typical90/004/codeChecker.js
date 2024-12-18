
// inputに入力データ全体が入る
function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    const startDate = new Date();
    let tempDate;
    let stepNum = 0
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

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

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

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");
    
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

    
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    //出力
    // console.log(output);
    return output;

}

function MainComp(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    const startDate = new Date();
    let tempDate;
    let stepNum = 0
    input = input.split("\n");
    const tmp = input[0].split(" ");
    // 	行・列定義を取得する。
    const H = parseInt(tmp[0], 10);
    const W = parseInt(tmp[1], 10);
    let output = "";

    // 	二次元配列の初期化
    const inArray = Array.from({ length: H }, () => Array(W).fill(undefined));

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    // 二次元配列への取込
    // ループ１ 1行目～H行目まで
    for (let i = 1; i <= H; i++) {
        let line = input[i].split(" ");
        // ループ２ 1列目～W列目まで
        for (let j = 0; j < W; j++) {
            inArray[i - 1][j] = parseInt(line[j])
        }
    }

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    const rowSum = [];
    for (let k = 0; k < H; k++){
        let sum = 0;
        for (let l = 0; l < W; l++) {
            sum += (inArray[k][l])
        }
        rowSum[k] = sum ;
    }

    const colSum = [];
    for (let l = 0; l < W; l++){
        let sum = 0;
        for (let k = 0; k < H; k++) {
            sum += (inArray[k][l])
        }
        colSum[l] = sum ;
    }
    
    
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

    
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

    //出力
    // console.log(output);
    return output;
}

function MainCompIni(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    input = input.split("\n");
    const tmp = input[0].split(" ");
    // 	行・列定義を取得する。
    const H = parseInt(tmp[0], 10);
    const W = parseInt(tmp[1], 10);
    let output = "";

    // 	二次元配列の初期化
    const inArray = Array.from({ length: H }, () => Array(W).fill(undefined));

    // 二次元配列への取込
    // ループ１ 1行目～H行目まで
    for (let i = 1; i <= H; i++) {
        let line = input[i].split(" ");
        // ループ２ 1列目～W列目まで
        for (let j = 0; j < W; j++) {
            inArray[i - 1][j] = line[j]
        }
    }

    for (let k = 0; k < H; k++) {
        output += "\n"
        let line = ""
        for (let l = 0; l < W; l++) {
            let sum = 0;
            for (let m = 0; m < H; m++) {
                sum += parseInt(inArray[m][l])
            }
            for (let m = 0; m < W; m++) {
                sum += parseInt(inArray[k][m])
            }
            sum -= parseInt(inArray[k][l])
            line += sum
            line += " "
            // console.log(sum)
        }
        // console.log(outLine.slice(0,outLine.length-1))
        output += line.slice(0, line.length - 1)
    }

    //出力
    // console.log(inArray);
    return output;

}

function MakeTwoDemData(a, b, c, d) {
    // condition 1  2<= H,W <= 2000  (a <= H,W <= b)
    // condition 2  1<= A_i,j <= 99  (c <= A_i,j <=d)
    // condition 3  all integer
    // H M \n A_1,1 A_1,2 ... \n A_2,1 A_2,2 ...
    // const [a,b,c,d] = [2,20,1,99]
    const H = Math.floor(Math.random() * (b - a + 1)) + a;
    const W = Math.floor(Math.random() * (b - a + 1)) + a;
    let output = ""
    output += (H + " " + W)
    for (let i = 0; i < H; i++) {
        output += "\n"
        let line = ""
        for (let j = 0; j < W; j++) {
            line += Math.floor(Math.random() * (d - c + 1)) + c;
            line += " "
        }
        output += line.slice(0, line.length - 1)
    }
    // console.log(output)
    return output
}


console.log("=== Make Test Data ===")
const [a, b, c, d] = [2, 2000, 1, 99];
const testData = MakeTwoDemData(a, b, c, d);
console.log(testData.split("\n")[0]);
// console.log(testData);

console.log("=== Exec Test1 ===");
const startDate1 = new Date();
const test1 = Main(testData);
// console.log(test1)
const endDate1 = new Date();
console.log(endDate1.getTime() - startDate1.getTime());

console.log("=== Exec Test2 ===");
const startDate2 = new Date();
const test2 = MainComp(testData);
// console.log(test2)
const endDate2 = new Date();
console.log(endDate2.getTime() - startDate2.getTime());

console.log("=== Compare Data === ");
console.log(test1 != test2 ? "Wrong Data" : "OK!!");

//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
// Main(require("fs").readFileSync("/dev/stdin", "utf8"));