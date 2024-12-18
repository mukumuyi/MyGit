function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

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
// console.log(output);
// return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
