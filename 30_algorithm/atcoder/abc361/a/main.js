function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,K,X] = inputArray[0].split(" ").map(Number);
    const A = inputArray[1].split(" ");
    let B =""

    for(let i=0;i<N;i++){
        if(i==K){
            B += (" "+X+" "+A[i])
        } else if(i==0){
            B += A[i]
        } else {
            B += (" "+A[i])
        }
    }

    if(K==N){
        B += (" "+X)
    }

    console.log(B);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
