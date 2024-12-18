function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const S = inputArray[0];
    const T = inputArray[1];
    let countD = 0;

    if(S.length > T.length){
        countD = T.length + 1
    } else if(S.length < T.length){
        countD = S.length + 1
    }

    for(let i = 0;i<S.length;i++){
        if(S[i]!=T[i]){
            countD = i + 1;
            // console.log(i+1);
            break;
        }
    }
    console.log(countD);

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
