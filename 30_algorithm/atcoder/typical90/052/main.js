function Main(input) {
    const inputArray = input.split("\n");
    const N = inputArray[0]
    const A = [];
    for (let i =0;i<N;i++){
        A[i]=inputArray[i+1].split(" ").map(BigInt).reduce((sum,i) => {return sum + i}) % BigInt(10**9 + 7)
    }
    console.log((A.reduce((sum,i)=>{return sum * i}) % BigInt(10**9 + 7)).toString())
    // console.log(A)
}


Main(require("fs").readFileSync("/dev/stdin", "utf8"));
