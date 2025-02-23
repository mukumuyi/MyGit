function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,T,P] =inputArray[0].split(" ");
    const L = inputArray[1].split(" ");

    L.sort((a,b)=> {return b-a})

    console.log(T-L[P-1] < 0 ? 0 :T-L[P-1]);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
