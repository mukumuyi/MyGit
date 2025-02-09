function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    input = input.split("\n");
    console.log(input);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
