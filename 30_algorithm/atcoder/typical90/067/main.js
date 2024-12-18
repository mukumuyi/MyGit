function ChgEigthToDecimal(N){
    let X = BigInt(0);
    let X2 =""

    // console.log("Enter Function ChgEigthToDecimal")
    
    // 8進数 -> 10進数
    for (let i=0;i<N.toString().length;i++){
        X += BigInt(N.toString().split("")[i])*(BigInt(8)**BigInt(N.toString().length-i-1))
    }

    const N2 = X.toString(9)

    for (let j=0;j<N2.length;j++){
        if(N2.split("")[j]=="8"){
            // console.log("5")
            X2 += "5"
        } else {
            // console.log(N2.split("")[j])
            X2 += N2.split("")[j]
        }
    }

    return X2
}


function Main(input) {
    inputData = input.split(" ");
    const N = BigInt(inputData[0]);
    const K = parseInt(inputData[1]);
    let X = N;

    // console.log(N)
    // console.log(K)

    for(let k=0;k<K;k++){
        // console.log("Loop Count : " + k);
        X = ChgEigthToDecimal(X)
    }

    console.log(X)

}

// console.log(8**20 - 1)
// console.log(8**20)
// console.log(BigInt(8**20))
// console.log(BigInt(8**20) - BigInt(1))
// console.log(BigInt(8**20).toString())
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
