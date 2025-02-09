function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n")[0].split(" ").map(Number)
    // const [A,B,C] = parseInt(inputArray[0])
    // console.log(inputArray)
    const inputSet = new Set(inputArray)
    // console.log(inputSet.size)
    if(inputSet.size==2){
        console.log("Yes")
    } else {
        console.log("No")
    }
    
    
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
