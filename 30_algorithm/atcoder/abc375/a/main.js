function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0])
    const S = (inputArray[1])
    let result =0;
    for(let i=1;i<N-1;i++){
        if(S[i-1]=="#" && S[i]=="." && S[i+1]=="#"){
            result += 1
        }
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
