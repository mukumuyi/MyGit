const { join } = require("path");

function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const [N,K] = input.split("\n")[0].split(" ").map(Number);
    let cnt=0;
    // console.log(input);
    for(let i=1;i<=N;i++){
        for(let j=1;j<=N;j++){
            if(N >= K-i-j && K-i-j > 0){
                cnt += 1
            }
        }
    }

    console.log(cnt)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
