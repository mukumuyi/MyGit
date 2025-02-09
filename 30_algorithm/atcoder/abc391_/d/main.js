
function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n"); 
    const [N,W] = inputArray[0].split(" ").map(Number);
    const A = [];
    for(let i=0; i<N;i++){
        A.push(inputArray[i+1].split(" ").map(Number))
    }
    console.log(A)
    
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
