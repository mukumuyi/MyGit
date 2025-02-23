// oj-t-js テストコマンド
// acc-s-js 提出コマンド
// inputに入力データ全体が入る
function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    const startDate = new Date();
    let tempDate;
    let stepNum = 0;

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const Q = parseInt(inputArray[N + 1]);
    const scoreArray1 = [];
    const scoreArray2 = [];
    let output = "";
    let startIndex, endIndex, sum1, sum2;
    // console.log(inputArray);
    // console.log(Q)
    [sum1,sum2] = [0,0];
    [scoreArray1[0],scoreArray2[0]] = [sum1,sum2];

    // make array class score per person (O(n))
    for (let i = 1; i < N + 1; i++) {
        sum1 += (inputArray[i].split(" ")[0] == "1" ? parseInt(inputArray[i].split(" ")[1]) : 0)
        sum2 += (inputArray[i].split(" ")[0] == "2" ? parseInt(inputArray[i].split(" ")[1]) : 0)
        // console.log(sum1,sum2);
        scoreArray1[i] = sum1;
        scoreArray2[i] = sum2;
        // console.log(inputArray[i]);
    }
    // console.log(scoreArray1);
    [tempDate, stepNum] = [new Date(), stepNum + 1];
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    let cnt = 0;

    // make answer array per question(O(q))
    for (let j = 0; j < Q; j++) {
        [startIndex, endIndex,] = [parseInt(inputArray[N + 2 + j].split(" ")[0]), parseInt(inputArray[N + 2 + j].split(" ")[1])]
        // console.log(inputArray[N+2+j])
        // console.log(startIndex,endIndex)
        // summary score per date (O(n))
        cnt++;

        // outputArray[j] = sum1 + " " + sum2;
        output += (scoreArray1[endIndex] - scoreArray1[startIndex-1]) + " " + (scoreArray2[endIndex] - scoreArray2[startIndex-1]);
        output += "\n";
        
    }
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");
    console.log(cnt)

    //出力
    // console.log(output);
    return output;

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

function Make010Data(a, b, c, d) {
    // condition 1  1<= N,Q <= 100000  (a <= H,W <= b)
    // condition 2  1<= P_i,j <= 100  (c <= A_i,j <=d)
    // condition 3  1 <= C <= 2 (Constance)
    // condition 4  all integer
    // H M \n A_1,1 A_1,2 ... \n A_2,1 A_2,2 ...
    // const [a,b,c,d] = [2,20,1,99]
    const N = Math.floor(Math.random() * (b - a + 1)) + a;
    const Q = Math.floor(Math.random() * (b - a + 1)) + a;
    let output = ""
    let C, P, L, R;
    output += (N)
    for (let i = 0; i < N; i++) {
        output += "\n"
        C = Math.floor(Math.random() * 2) + 1;
        P = Math.floor(Math.random() * (d - c + 1)) + c;
        output += C + " " + P;
    }

    output += "\n"
    output += (Q)
    for (let j = 0; j < Q; j++) {
        output += "\n"
        L = Math.floor(Math.random() * N) + 1;
        R = Math.floor(Math.random() * N) + 1;
        output += (L <= R ? L : R) + " " + (L <= R ? R : L);
    }

    console.log("N:", N)
    console.log("Q:", Q)
    // console.log(output)
    return output

}


console.log("=== Make Test Data ===")
const [a, b, c, d] = [1, 100000, 1, 99];
const testData = Make010Data(a, b, c, d);
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
