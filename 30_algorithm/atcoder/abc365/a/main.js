function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const Y  = parseInt(input.split("\n")[0]);
    let result;
    if(Y%4!=0 || Y%100==0 && Y%400!=0 ){
        result = 365;
    } else {
        result =366
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
