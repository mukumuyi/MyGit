function Main(input) {
    tempInput = input.split("\n");
    const [N,P,Q] = tempInput[0].split(" ").map(BigInt)
    // const N = tempInput[0].split(" ")[0];
    // const P = parseInt(tempInput[0].split(" ")[1]);
    // const Q = parseInt(tempInput[0].split(" ")[2]);
    const inputArray = tempInput[1].split(" ").map(BigInt)
    let cnt = 0;
    let x;

    for(let i = 0 ;i < N ;i++){
        x = (inputArray[i]) % P
        for(let j = i + 1; j < N ;j++){
            x = (x * inputArray[j]) % P
            for(let k = j + 1 ; k < N; k++ ){
                x = (x * inputArray[k]) % P
                for(let l = k + 1 ; l < N ;l++){
                    x = (x * inputArray[l]) % P
                    for(let m = l + 1 ;m < N ; m++){
                        x = (x * inputArray[m]) % P
                        if(x == (Q) ) {
                            cnt += 1
                        }
                    }
                }
            }
        }
    }
    console.log(cnt)

}

function MakeData(a,b,c) {
    let output = ""
    const N = Math.floor(Math.random() * (a - b -1)) + b
    const P = Math.floor(Math.random() * (c - 2)) + 1
    const Q = P - (Math.floor(Math.random() * (P - 2)) + 1)
    output += N + " " + P + " " + Q
    output += "\n"
    for(let i=0;i < N ;i++){
        output += Math.floor(Math.random() * (c - 1)) 
        output += " "
    }
    // console.log(output)
    return output
}

// const input = MakeData(100,5,1000000000);
// console.log(input.split("\n")[0])
// const Start = new Date()
// Main(input)
// const End = new Date()
// console.log(End - Start)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
