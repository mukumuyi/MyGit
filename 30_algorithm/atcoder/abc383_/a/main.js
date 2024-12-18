function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n")
    const N = parseInt(inputArray[0])
    // console.log(inputArray)
    let T,V;
    let B = 0
    let W = 0

    for(let i = 0;i<N;i++){
        [T,V] = inputArray[i+1].split(" ").map(Number)
        W -= (T - B)
        W = W < 0 ? 0 : W 
        W += V
        B = T
    }
    console.log(W)

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
