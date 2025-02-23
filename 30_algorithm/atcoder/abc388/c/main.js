function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = (inputArray[1].split(" ").map(Number));
    let sum = 0;
    
    // console.log(A)

    for(let i=0;i<N;i++){
        let a = i
        let b = N -1
        while(b - a > 1){
            if(A[Math.ceil((b+a)/2)] >= A[i]*2){
                b = Math.ceil((b+a)/2)
            } else if(A[Math.ceil((b+a)/2)] < A[i]*2){
                a = Math.ceil((b+a)/2)
            }
            // console.log(i,a,b)
        }
        if(A[b]>=A[i]*2){
            sum += (N-b)
        } else {
            sum += (N-b-1)
        }
    }

    console.log(sum)
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
