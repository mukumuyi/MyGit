function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    [a,b,c] = input.split("");
    console.log(b + c + a , c + a +b);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
