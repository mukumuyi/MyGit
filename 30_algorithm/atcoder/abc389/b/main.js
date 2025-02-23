function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const X  = BigInt(input.split("\n")[0])
    let tmp = X
    let Flg = true;
    let i = 0n;
    while(tmp!=1){
        i += 1n;   
        tmp = tmp / i
    }

    console.log(parseInt(i));

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
