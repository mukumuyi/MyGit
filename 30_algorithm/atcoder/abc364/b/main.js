function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [H,W] = inputArray[0].split(" ").map(Number);
    let [Si,Sj] = inputArray[1].split(" ").map(Number);
    const X = inputArray[H+2]
    const C = new Array(H);
    for (let i=0;i<H;i++){
        C[i] = inputArray[i+2]
    }

    for(let i=0;i<X.length;i++){
        if(X[i]=="L" && Sj > 1 && C[Si-1][Sj-2] == "."){
            Sj -= 1
        } else if(X[i]=="R" && Sj < W && C[Si-1][Sj] == "."){
            Sj += 1
        } else if(X[i]=="U" && Si > 1 && C[Si-2][Sj-1] == "."){
            Si -= 1
        } else if(X[i]=="D" && Si < H && C[Si][Sj-1] == "."){
            Si += 1
        }
        // console.log(Si,Sj);
    }

    console.log(Si,Sj);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
