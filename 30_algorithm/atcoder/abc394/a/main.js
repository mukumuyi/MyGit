function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S  = input.split("\n")[0];
    let result = "";

    for(let i=0;i<S.length;i++){
        if(S[i]=="2"){
            result += S[i]
        }
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
