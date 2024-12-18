function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const S = inputArray[0].split("|")
    let result = "";
    // console.log(S);|----------|

    for(i=1;i<S.length-1;i++){
        // console.log(S[i].length)
        if(i!=1){
            result += " ";
        }
        result += S[i].length;
    }

    console.log(result)
    
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
