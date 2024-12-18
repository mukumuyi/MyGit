function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

const inputArray = input.split(" ");
const A = parseInt(inputArray[0]);
const B = parseInt(inputArray[1]);

if((B-A) % 2 == 0 && B != A ){
    console.log("3")
} else if (B == A ){
    console.log("1")    
} else {
    console.log("2")
}

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
