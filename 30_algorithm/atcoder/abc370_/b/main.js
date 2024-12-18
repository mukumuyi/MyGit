function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = []
    let k = 1;
    for(i=0;i < N ;i++){
        A[i] = inputArray[i+1].split(" ").map(Number)
    }

    for(j=1;j<=N;j++){
        // console.log("[k,j]=[",k,j,"]")
        if(k>=j){
            // console.log(A[k-1][j-1])
            k = A[k-1][j-1]
        } else {
            // console.log(A[j-1][k-1])
            k = A[j-1][k-1]
        }
    }

    //出力
    console.log(k);
    // return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
