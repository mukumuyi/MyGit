function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = parseInt(input.split("\n")[0]);
    let tmp = inputArray;
    let N = 0;
    let A = "";
    for(let i=10;i>=0;i--){
        while(tmp >= 3**i){
            tmp -= 3**i
            A += (N==0 ? i :" " + i);
            N += 1
        }
    }

    console.log(N + "\n" + A);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
