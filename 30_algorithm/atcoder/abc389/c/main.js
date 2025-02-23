function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    let L = [0]
    let cnt =0
    let idx = 0
    for(let i = 0;i<N;i++){
        const [T,S] = inputArray[i+1].split(" ").map(Number);
        if(T==1){
            L.push(S + L[L.length-1])
        } else if (T==2){
            idx += 1
            // L.shift()
            // L = L.map((i)=>{
            //     return i-L[0]
            // })
        } else if (T==3){
            console.log(L[S-1+idx] - L[idx])
            cnt += 1
        }
        // console.log(L)
    }
    if(cnt==0){
        console.log()
    }
    // console.log(inputArray);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
