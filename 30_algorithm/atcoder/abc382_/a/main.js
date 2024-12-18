function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [N,D] = inputArray[0].split(" ").map(Number);
    const S = inputArray[1]
    let cnt = 0;
    // console.log(N,D,S)
    for(let i = 0;i<N;i++){
        if(S[i]=="@"){
            cnt += 1;
        }
    }

    console.log(N - cnt + D)

    // if(inputArray[0] == 1 & inputArray[1] == 2 & inputArray[2] == 2 & inputArray[3] == 3 & inputArray[4] == 3 & inputArray[5] == 3 ){
    //     console.log('Yes')
    // } else {
    //     console.log('No')
    // }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
