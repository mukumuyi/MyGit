function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S  = input.split("\n")[0];

    console.log(S.replaceAll(".",""));

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
