function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const K  = input.split("\n")[0][0];
    console.log(K + "UPC");

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
