function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [N,D] = inputArray[0].split(" ").map(Number);
    let S = inputArray[1]
    let cnt = 0;
    // console.log(N,D,S)
    for(let j = 0;j<D;j++){
        // console.log(j+1,"日目 :",S)
        for(let i = N;i>0;i--){        
            if(S[i-1]=="@"){
                S = S.substring(0,i-1) + ".".repeat(N-i+1)
                break;
            }
        }
    }

    console.log(S)

    // if(inputArray[0] == 1 & inputArray[1] == 2 & inputArray[2] == 2 & inputArray[3] == 3 & inputArray[4] == 3 & inputArray[5] == 3 ){
    //     console.log('Yes')
    // } else {
    //     console.log('No')
    // }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
