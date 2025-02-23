function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [N,Q] = inputArray[0].split(" ").map(Number);
    let total =0;
    const A = inputArray[1].split(" ").map((i)=>{
        total += Number(i)
        return total
    });

    A.unshift(0);

    // console.log(A);

    for(let i=0; i< Q;i++){
        const [L,R] = inputArray[i+2].split(" ").map(Number);
        console.log(A[R]-A[L-1]);
    }


    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
