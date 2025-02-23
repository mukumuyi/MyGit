function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    const Q = parseInt(inputArray[N+1]);
    for(let i=0;i<Q;i++){
        const [t,d] = inputArray[N+2+i].split(" ").map(Number);
        const [q,r] = inputArray[t].split(" ").map(Number)
        // console.log(t,d,q,r)
        if(d<r){
            console.log(r)
        } else {
            console.log(Math.ceil((d-r) / q) * q + r)
        }
        

    }



    // console.log(inputArray);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
