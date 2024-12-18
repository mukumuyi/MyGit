function Main(input) {
    const inputArray = input.split("\n");
    const [N,Q] = inputArray[0].split(" ").map(Number);
    const A = inputArray[1].split(" ").map(Number);
    const B = [];
    let L,R,V ;
    let sumB = 0;

    // if(N===1){
    //     console.log(0)
    //     return
    // }

    for (let i= 0;i<N-1;i++){
        B[i] = A[i] - A[i+1]
        sumB += Math.abs(B[i]);
    }

    // console.log(B)
    // sumB = B.reduce((sum,i)=> Math.abs(i) + Math.abs(sum));
    // console.log(sumB);

    for(let i=0;i<Q;i++){
        // C[i] = inputArray[i+2].split(" ").map(Number)
        [L,R,V] = inputArray[i+2].split(" ").map(Number);
        if(L >= 2){
            sumB -= Math.abs(B[L-2])
            sumB += Math.abs(B[L-2] - V)
            B[L-2] -= V
        }
        if(R < N){
            sumB -= Math.abs(B[R-1])
            sumB += Math.abs(B[R-1] + V)
            B[R-1] += V
        }

    // console.log(B)
    console.log(sumB)
    // console.log(B.reduce((sum,i)=> Math.abs(i) + Math.abs(sum)));
    }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
