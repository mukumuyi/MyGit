function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const Q = parseInt(inputArray[2]);
    let total = 0;
    const A = inputArray[1].split(" ").map((i) => {
        total += Number(i)
        return total
    })
    A.unshift(0);
    // console.log(A);
    for(let i=0;i<Q;i++){
        const [L,R]=inputArray[i+3].split(" ");
        const sum = A[R] - A[L-1]
        const cnt = (R-L+1)/2
        if(sum == cnt){
            console.log("draw")
        } else if(sum > cnt) {
            console.log("win")
        } else {
            console.log("lose")
        }
        // console.log(A[R] - A[L-1],R-L+1/2)
    }

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
