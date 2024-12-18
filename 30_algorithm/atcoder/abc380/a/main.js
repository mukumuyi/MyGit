function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n")[0].split("").map(Number).sort((a,b)=>a-b)
    // console.log(inputArray)

    if(inputArray[0] == 1 & inputArray[1] == 2 & inputArray[2] == 2 & inputArray[3] == 3 & inputArray[4] == 3 & inputArray[5] == 3 ){
        console.log('Yes')
    } else {
        console.log('No')
    }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));

