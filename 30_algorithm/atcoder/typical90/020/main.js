function Main(input) {
    // inputArray = input.split("\n").map(Number);
    const [a,b,c] = input.split(" ").map(BigInt);
    // console.log(a,b,c);
    if(a < c ** b ){
        console.log('Yes')
    } else {
        console.log('No')
    }
}
// console.log(9*10**18)
// console.log(13 ** 17)
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
