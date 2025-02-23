function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [N,M] = inputArray[0].split(" ").map(Number);
    const A = inputArray[1].split(" ").map(Number);
    let B = ""
    let cnt =0;
    // console.log(inputArray);

    for(let i=1;i<=N;i++){
        let flg = true;
        for(let j=0;j<M;j++){
            if(i==A[j]){
                flg = false
            }
        }
        if(flg){
            B += cnt==0 ? i :" " + i;
            cnt += 1;
        }
    }
    console.log(cnt);
    console.log(B)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
