function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(Number);
    let max1=0,max2=0,idx1=0,idx2=0;
    for(let i=0;i<N;i++){
        if(max1<A[i]){
            max2 = max1
            idx2 = idx1
            max1 = A[i]
            idx1 = i
        } else if (max2<A[i]){
            max2 = A[i]
            idx2 = i
        }
        // console.log(max1,max2)
    }
    
    console.log(idx2+1);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
