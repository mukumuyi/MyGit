function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const N = input.split("\n")[0];
    let result = 0;
    // console.log(input);
    for(let i=0;i<N.length;i++){
        if(N[i]=="1"){
            result += 2**(N.length-i-1);
            // console.log(result)
        }
    }

    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
