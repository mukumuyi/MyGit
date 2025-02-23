function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const A = input.split("\n")[0].split(" ").map(Number);
    if(A[0] * A[1] == A[2] || A[0] * A[2] == A[1] || A[2] * A[1] == A[0] ){
        console.log("Yes")
    } else {
        console.log("No")
    }

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
