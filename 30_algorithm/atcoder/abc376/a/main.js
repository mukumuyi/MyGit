function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,C] =inputArray[0].split(" ").map(Number);
    const T = inputArray[1].split(" ").map(Number);
    let pre = 0;
    let cnt =0;
    for(let i=0;i<T.length;i++){
        // console.log(T[i],C,cnt)
        if(i==0 || T[i]-pre >= C){
            cnt+=1
            pre = T[i]
        } 
    }
    console.log(cnt);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
