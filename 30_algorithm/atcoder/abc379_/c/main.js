function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const [N,M] = inputArray[0].split(" ").map(Number);
    const X = inputArray[1].split(" ").map(Number);
    const A = inputArray[2].split(" ").map(Number);
    const XA =[]
    for (let i = 0; i< M;i++){
        XA[i] = {id:X[i],value:A[i]}
    }

    XA.sort((a,b)=>a.id - b.id)
    // console.log(XA)

    const Y = BigInt(N + 1) * BigInt(N) / BigInt(2)
    let sum = BigInt(0);
    let sum2 = BigInt(0);

    for(let i =M-1;i>=0;i--){
        sum += BigInt(XA[i].id)*BigInt(XA[i].value)
        sum2 += BigInt(XA[i].value)
        // console.log(N - i , sum2)
        if(BigInt(N) - BigInt(XA[i].id) + BigInt(1) < sum2){
            console.log(-1)
            return ;
        }
    }
    // console.log(Y,sum,sum2)

    if(BigInt(N) != sum2){
        console.log(-1)
        return ;
    }
    
    console.log(((Y - sum).toString()))

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
