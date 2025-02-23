
function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(Number);
    let result = "No";

    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            for(let k=0;k<N;k++){
                if(i!=j && j!=k && i!=k && A[i]+A[j]+A[k]==1000){
                    result = "Yes";
                }
            }
        }
    }
    console.log(result)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
