function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const [A,B] = input.split(" ").map(Number);
    let result = 'No'
    // console.log(A,B)
    
    for (let i = A; i <= B ;i++){
        // console.log(100 % i)
        if(100 % i==0){
            result = 'Yes';
        }
    }

    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
