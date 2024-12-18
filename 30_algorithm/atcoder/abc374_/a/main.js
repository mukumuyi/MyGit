function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

const S = input;
// console.log(S.trim().slice(-3))

if(S.trim().slice(-3)==='san'){
    console.log('Yes')
} else {
    console.log('No')
}
} 

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
