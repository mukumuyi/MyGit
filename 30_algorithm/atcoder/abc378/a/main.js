function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const A  = input.split("\n")[0].split(" ").map(Number);
    const B = new Array(A.length).fill(0)
    let result = 0;
    for(let i=0;i<A.length;i++){
        B[A[i]-1] += 1
    }

    for(let i=0;i<A.length;i++){
        // console.log(B[i])
        if(B[i]==4){
            result +=2
        } else if(B[i]>=2){
            result +=1
        }
    }

    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
