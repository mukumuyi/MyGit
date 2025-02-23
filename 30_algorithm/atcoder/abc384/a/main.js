function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,C1,C2] = inputArray[0].split(" ");
    const S = inputArray[1];
    let result = "";
    for(let i=0;i<parseInt(N);i++){
        if(S[i]!=C1){
            result += C2 
        } else {
            result += C1
        }
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
