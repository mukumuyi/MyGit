function Main(input) {
    const [L,R] = input.split("\n")[0].split(" ")
    const BiL = BigInt(L)
    const BiR = BigInt(R)
    const MinLength = L.toString().length
    const MaxLength = R.toString().length
    const dev = 10n**9n + 7n
    let MinTemp,MaxTemp
    let sum = 0n;
    let sum2 = 0n;

    for(let i = BiL;i<=BiR;i++){
        // console.log(i,L,R)
        // console.log(i.toString().length * i) 
        sum = (sum + BigInt(i.toString().length) * (i % dev)) % dev
    }


    for(let i = MinLength;i<=MaxLength;i++){
        // console.log("Min :", i==MinLength?BiL:BigInt(10**(i-1)))
        // console.log("Max :", i==MaxLength?BiR:BigInt(10**(i)-1))
        MinTemp = (i==MinLength?BiL:BigInt(10**(i-1))) 
        MaxTemp = (i==MaxLength?BiR:BigInt(10**(i)-1)) 
        sum2 = (sum2 + BigInt(i) * (MinTemp + MaxTemp) * (MaxTemp - MinTemp + 1n) / 2n) % dev
    }

    console.log("Result Bad Perform : ",sum.toString());
    console.log("Result Good Perform : ",sum2.toString());
    console.log(sum2.toString())
    return
}

const A = Math.ceil(Math.random()*(10**7))
const B = Math.ceil(Math.random()*(10**3))
// const A = 1;
// const B = 1;
let input ;
if(A>B){
    input = B.toString() + " " + A.toString()
} else {
    input = A.toString() + " " + B.toString()
}
console.log(input)
Main(input)
// Main("1 5")
// Main("1000000 1000000")
// Main("1001 869120")
// Main("100 746254773042091083")
// Main(require("fs").readFileSync("/dev/stdin", "utf8"));
