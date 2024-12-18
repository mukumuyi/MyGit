
// inputに入力データ全体が入る
function Main(input) {
    
const inputArray = input.split("\n");
const N = parseInt(inputArray[0]);
const tempArray = (inputArray[1].split(" "));
const diffArray = [];
let tmpCnt =0;
let totalCnt = N ;
if (N>1) {
    totalCnt += N - 1
}
for (i =0 ; i < N - 1; i++){
    diffArray[i] = tempArray[i + 1] - tempArray[i]
    if(diffArray[i] == diffArray[i-1]) {
        tmpCnt += 1
        totalCnt += tmpCnt
    } else {
        tmpCnt = 0
    }
}

// console.log(diffArray)
// console.log(cnt)

//出力
console.log(totalCnt)
}

function MainComp(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    const startDate = new Date();
    let tempDate;
    let stepNum = 0;

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const Q = parseInt(inputArray[N + 1]);
    const scoreArray = [];
    let output = "";
    let startIndex, endIndex, sum1, sum2;
    // console.log(inputArray);
    // console.log(Q)

    // make array class score per person (O(n))
    for (let i = 1; i < N + 1; i++) {
        scoreArray[i - 1] = inputArray[i];
        // console.log(inputArray[i]);
    }
    // console.log(scoreArray);
    [tempDate, stepNum] = [new Date(), stepNum + 1];
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");


    let cnt = 0;

    // make answer array per question(O(q))
    for (let j = 0; j < Q; j++) {
        [startIndex, endIndex, sum1, sum2] = [parseInt(inputArray[N + 2 + j].split(" ")[0]), parseInt(inputArray[N + 2 + j].split(" ")[1]), 0, 0]
        // console.log(inputArray[N+2+j])
        // console.log(startIndex,endIndex)
        // summary score per date (O(n))
        for (let k = startIndex - 1; k < endIndex; k++) {
            // console.log(scoreArray[k])
            if (scoreArray[k].split(" ")[0] == "1") {
                sum1 += parseInt(scoreArray[k].split(" ")[1]);
            } else {
                sum2 += parseInt(scoreArray[k].split(" ")[1]);
            }
            cnt++;
        }
        // outputArray[j] = sum1 + " " + sum2;
        output += sum1 + " " + sum2;
        output += "\n";
    }
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");
    console.log(cnt)

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

function Make369C_Data(a, b, c, d) {
    // condition 1  1<= N,Q <= 100000  (a <= H,W <= b)
    // condition 2  1<= P_i,j <= 100  (c <= A_i,j <=d)
    // condition 3  1 <= C <= 2 (Constance)
    // condition 4  all integer
    // H M \n A_1,1 A_1,2 ... \n A_2,1 A_2,2 ...
    // const [a,b,c,d] = [2,20,1,99]
    const N = Math.floor(Math.random() * (b - a + 1)) + a;
    let output = ""
    let A;
    output += N
    output += "\n"
    for (let i = 0; i < N; i++) {
        A = Math.floor(Math.random() * (d - c + 1)) + c;
        output += A;
        output += " "
    }

    // console.log(output)
    return output

}

console.log("=== Make Test Data ===")
const [a, b, c, d] = [1, 200000, 1, 1000000000];
const testData = Make369C_Data(a, b, c, d);
console.log(testData.split("\n")[0]);
// console.log(testData);

console.log("=== Exec Test1 ===");
const startDate1 = new Date();
const test1 = Main(testData);
// console.log(test1)
const endDate1 = new Date();
console.log(endDate1.getTime() - startDate1.getTime());

// console.log("=== Exec Test2 ===");
// const startDate2 = new Date();
// const test2 = MainComp(testData);
// // console.log(test2)
// const endDate2 = new Date();
// console.log(endDate2.getTime() - startDate2.getTime());

// console.log("=== Compare Data === ");
// console.log(test1 != test2 ? "Wrong Data" : "OK!!");

//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
// Main(require("fs").readFileSync("/dev/stdin", "utf8"));