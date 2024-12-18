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
let i = 0;
let exp = 0;
let temp0,temp1 ,temp2,temp3;
while (i < N - 2){
    temp0 = parseInt(tempArray[i]) + parseInt(tempArray[i+1]) * 2 
    temp1 = temp0 + parseInt(tempArray[i+2])
    temp2 = parseInt(tempArray[i]) + parseInt(tempArray[i+2]) * 2 
    temp3 = parseInt(tempArray[i+1]) + parseInt(tempArray[i+2]) * 2 

    if(temp1 >= temp2 && temp1 >= temp3) {
        i += 2
        exp += temp0
    } else if (temp2 > temp1 && temp2 >= temp3) {
        i += 3;
        exp += temp2
    } else {
        i += 3;
        exp += temp3
    }    
}
if (i==N-2) {
    exp += parseInt(tempArray[i+1]) + parseInt(tempArray[i+2]) * 2 
} 
if(i == N-1){
    exp += parseInt(tempArray[i+1])
}

console.log(exp)
// console.log(diffArray)
// console.log(cnt)

//出力
// console.log(totalCnt)
// console.log(output);
// return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
