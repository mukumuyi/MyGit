function Main(input) {
    const [N,L] = input.split(" ").map(Number);
    const A = new Array(N+1);
    // console.log(N,L);
    A[0] = 1;

    for (let i = 1; i<=N;i++){
        if(i < L){
            A[i] = (A[i - 1] % (10**9+7) )
            // console.log("A",i)
        } else {
            A[i]= (A[i - 1] + A[i - L]) % (10**9+7)
            // console.log("B",i)
        }
    }
    console.log(A[N] % (10**9+7))
}
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
