function GCD(a,b){
    // console.log(a,b)
    if(b===BigInt(0)){
        return a
    }
    return GCD(b,a % b)
}


function Main(input) {
    [A,B] = input.split(" ").map(BigInt);
    // console.log(A,B)
    // console.log(GCD(A,B)) 
    // console.log(GCD(A,B))
    if((A * B / GCD(A,B)) > BigInt(10**18)){
        console.log("Large")
    } else {
        console.log((A * B / GCD(A,B)).toString())
    }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
