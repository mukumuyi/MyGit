function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [N,X] = inputArray[0].split(" ");
    const A = inputArray[1].split(" ");
    let result = 'No'
    
    for(let i = 0; i< N ;i++){
        if(X==A[i]){
            result = 'Yes';
        }
    }

    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
