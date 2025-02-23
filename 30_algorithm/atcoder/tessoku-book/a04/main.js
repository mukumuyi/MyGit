function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const N = parseInt(input.split("\n")[0]);
    let result = "";
    let tmp = N;

    for(let i=9;i>=0;i--){
        if(tmp>=2**i){
            tmp = tmp - 2**i
            result += "1"
        } else {
            result += "0"
        }
        // console.log(tmp)
    }

    console.log(result)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
