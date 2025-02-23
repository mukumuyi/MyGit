function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    let x = 0,y=0,result=0;
    for (let i=0;i<N;i++){
        const [a,b] = inputArray[i+1].split(" ").map(Number);
        result += Math.sqrt((x-a)**2 + (y-b)**2);
        x = a;
        y = b;
    }
    result += Math.sqrt((0-x)**2 + (0-y)**2)
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
