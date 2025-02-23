function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,D] = inputArray[0].split(" ").map(Number)
    let max = 0;
    // console.log(inputArray);
    for(let i=1;i<=D;i++){
        max = 0;
        for(let j=0;j<N;j++){
            const [T,L] = inputArray[j+1].split(" ").map(Number);
            if(max < T * (L+i)){
                max = T*(L+i)
            }
        }
        console.log(max)
    }

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
