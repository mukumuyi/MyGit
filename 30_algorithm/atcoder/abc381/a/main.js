function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const N = parseInt(input.split("\n")[0]);
    const S = input.split("\n")[1]
    let result = "Yes"
    for(let i=0;i<N;i++){
        if(S[i]!="1" && i <(N+1)/2-1 || S[i]!= "/" && i == (N+1)/2 - 1 || S[i]!="2" && i > (N+1)/2-1){
            result = "No"
        } 
    }


    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
