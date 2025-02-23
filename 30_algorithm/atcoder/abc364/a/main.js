function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    let result="Yes" ,tmp;
    for(let i=0;i<N;i++){
        if(tmp=="sweet" && inputArray[i+1]=="sweet" && i < N-1){
            result = "No"
        }
        tmp = inputArray[i+1]
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
