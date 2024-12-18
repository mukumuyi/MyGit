function Main(input) {
    inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(Number).sort((a,b)=>a - b);
    const B = inputArray[2].split(" ").map(Number).sort((a,b)=>a - b);
    let sum = 0;
    // console.log(N,A,B);

    for(let i = 0;i < N;i++){
        sum += Math.abs(A[i]-B[i])
    }

    console.log(sum)
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
