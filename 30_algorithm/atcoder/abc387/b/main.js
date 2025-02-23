function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const X  = parseInt(input.split("\n")[0]);
    let sum =0;
    for(let i=1;i<=9;i++){
        for(let j=1;j<=9;j++){
            sum += (i*j== X ? 0 : i*j)
        }
    }
    console.log(sum);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
