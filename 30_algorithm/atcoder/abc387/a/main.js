function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const [A,B]  = input.split("\n")[0].split(" ").map(Number);
    console.log((A + B)**2);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
