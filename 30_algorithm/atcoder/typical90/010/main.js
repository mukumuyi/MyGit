function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

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
// [tempDate, stepNum] = [new Date(), stepNum + 1];
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

// let cnt = 0;

// make answer array per question(O(q))
for (let j = 0; j < Q; j++) {
    [startIndex, endIndex,] = [parseInt(inputArray[N + 2 + j].split(" ")[0]), parseInt(inputArray[N + 2 + j].split(" ")[1])]
    // console.log(inputArray[N+2+j])
    // console.log(startIndex,endIndex)
    // summary score per date (O(n))
    // cnt++;

    // outputArray[j] = sum1 + " " + sum2;
    output += (scoreArray1[endIndex] - scoreArray1[startIndex-1]) + " " + (scoreArray2[endIndex] - scoreArray2[startIndex-1]);
    output += "\n";
    
}
// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");
// console.log(cnt)

//出力
console.log(output);
// return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
