function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,R] = inputArray[0].split(" ").map(Number);
    let rate = R;

    for(let i=0;i<N;i++){
        const [D,A] = inputArray[i+1].split(" ").map(Number)
        if((D==1 && rate >= 1600 && rate <= 2799)||(D==2 && rate >= 1200 && rate <= 2399)){
            rate += A
        } 
    }


    console.log(rate);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
