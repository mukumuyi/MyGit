function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    const tmp = new Array(50).fill("");
    let result = "";
    for(let i=0;i<N;i++){
        tmp[inputArray[i+1].length-1]=inputArray[i+1]
    }

    for(let i=0;i<50;i++){
        result += tmp[i];
    }
    // console.log(tmp)
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
