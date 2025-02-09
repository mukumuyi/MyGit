function Xor(A,N){
    let X = BigInt(0);
    for(let i=0;i<N;i++){
        X = X ^ A[i]
    }
    console.log(X)
}

function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n"); 
    const N = parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(BigInt);
    let X = BigInt(0);
    // console.log(N,M);
    console.log(N)
    console.log(A)
    
    Xor(A,N)
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
