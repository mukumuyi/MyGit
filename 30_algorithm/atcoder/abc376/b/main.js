function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,Q]=inputArray[0].split(" ").map(Number);
    let L=1,R=2,result=0;
    for(let i=0;i<Q;i++){
        const H =(inputArray[i+1].split(" ")[0])
        const T =parseInt(inputArray[i+1].split(" ")[1])
        if(H=="L"){
            if(L < R && R < T){
                // console.log(L + N -T)
                result += (L + N -T)
            }else if(T < R && R < L){
                // console.log(N + T - L)
                result += (N + T - L)
            } else {
                // console.log(Math.abs(L - T))
                result += Math.abs(L - T)
            }
            L = T;
        } else {
            if(R < L && L < T){
                // console.log(R + N - T)
                result += (R + N - T)
            }else if(T < L && L < R){
                // console.log(N + T - R)
                result += (N + T - R)
            }else {
                // console.log(Math.abs(R - T))
                result += Math.abs(R - T)
            }
            R = T;
        }
    }

    console.log(result);
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
