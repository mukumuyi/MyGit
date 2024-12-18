function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const [N,K] = inputArray[0].split(" ").map(Number);
    const S = inputArray[1].split("");
    let OKCount = 0;
    let eatCount=0;
    // console.log(N,K,S);
    for(let i=0;i<N;i++){
        // console.log(S[i]);
        if(S[i]==="O"){
            OKCount += 1;
        } else {
            OKCount =0;
        }
        if(OKCount >= K){
            OKCount =0;
            eatCount+=1;
        }
    }
    console.log(eatCount)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
