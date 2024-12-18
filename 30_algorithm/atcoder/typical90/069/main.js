
function Main0(input) {
    const [N,K] = input.split(" ").map(Number);
    // console.log(N,K);
    let sum = 1;
    const dev = 10**9 + 7

    if(K <= 2 & N >= 3){
        console.log(0)
        return
    }

    for(let i=0;i<N;i++){
        if(i===0){
            sum *= K % (dev) ;
            sum = sum % (dev) ;
            // console.log(sum,'a')
        } else if(i===1){
            sum *=(K-1) % (dev)
            sum = sum % (dev) ;
            // console.log(sum,'b')
        } else {
            // sum *=(K-2) % (10**9+7)
            sum = (sum * (K-2) % (dev)) % (dev) ;
            // console.log(sum,'c')
        }
        console.log("resultA : ",sum)
    }
    console.log(sum)

}

function Main(input){
    const dev = BigInt(10**9 + 7)
    let [N,K] = input.split(" ").map(BigInt);
    let temp = (K - 2n) % dev;
    // let result = 1n;
    let result = ((1n * (N>0n?K:1n) * (N>1n?(K-1n):1n)) % dev)
    N1 = N - 2n
    // console.log("resultB : ",result)

    if(K <= 2n & N >= 3n){
        console.log(0)
        return
    }

    while (N1 > 0) {
        // N の最下位ビットが 1 なら結果に base を掛ける
        // console.log("temp :" ,temp)
        if ((N1 % 2n) === 1n) {
            result = (result * temp % dev ) % dev;
        }

        // base を次の段階に進める
        temp = (temp * temp) % dev;

        // N を右に 1 ビットシフト（N を 2 で割る）
        N1 = BigInt(N1 / 2n);
        // console.log("resultB : ",result)
    }
    // console.log(((result * (N>0n?K:1n) * (N>1n?(K-1n):1n)) % dev).toString())
    console.log((result).toString())
    // console.log(((result * K * (K-1n)) % dev).toString())
    return
    
}

// const input = "4 69301679"
// // const input =Math.ceil(Math.random()*(10**0)*5).toString() + " " + Math.ceil(Math.random()*(10**8)).toString()
// console.log(input)
// Main(input)
// Main0(input)
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
