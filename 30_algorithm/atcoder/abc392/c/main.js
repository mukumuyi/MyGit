function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const P = inputArray[1].split(" ").map(Number);
    const Q = inputArray[2].split(" ").map(Number);
    const R = new Array(N).fill(0)
    let result = "";
    // console.log(input);

    for(let i=0;i<N;i++){
        R[Q[i]-1] = P[i]
    }

    for(let i=0;i<N;i++){
        result += i==0 ? Q[R[i]-1] : " " + Q[R[i]-1];
        // console.log(Q[R[i]-1] )
    }

    console.log(result)
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
