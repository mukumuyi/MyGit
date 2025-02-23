function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const S = new Array(8)
    let result = 0;
    for(let i=0;i<8;i++){
        S[i] = new Array(8).fill(1)
    }

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(inputArray[i][j]=="#"){
                for(let k=0;k<8;k++){
                    S[i][k]=0
                }
                for(let k=0;k<8;k++){
                    S[k][j]=0
                }
            }
        }
    }

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            result +=S[i][j]
        }
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
