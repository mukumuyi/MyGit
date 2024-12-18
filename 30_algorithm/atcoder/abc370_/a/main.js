function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

const [L,R] = input.split(" ").map(Number);

if(L + R == 1 ){
    if(L == 1 ){
        console.log("Yes")
    } else {
        console.log("No")
    }
} else {
    console.log("Invalid")   
}

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
