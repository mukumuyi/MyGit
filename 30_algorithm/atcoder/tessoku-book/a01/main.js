function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    N = input.split("\n")[0];
    console.log(N * N);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
