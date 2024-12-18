function Main(input) {
// 1行目がinput[0], 2行目がinput[1], …に入る
// const startDate = new Date();
// let tempDate;
// let stepNum = 0;

// [tempDate, stepNum] = [new Date(), stepNum + 1]
// console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

const [S1,S2,S3] = input.split("\n")[0].split(" ");

if((S1==">" && S2==">" && S3==">") || (S1=="<" && S2=="<" && S3=="<")) {
    console.log('B')
} else if ((S1==">" && S2=="<" && S3=="<") || (S1=="<" && S2==">" && S3==">")){
    console.log('A')
} else if ((S1==">" && S2==">" && S3=="<") || (S1=="<" && S2=="<" && S3==">")){
    console.log('C')
} 
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
