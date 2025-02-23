function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [R,G,B] = inputArray[0].split(" ").map(Number);
    const C = inputArray[1]
    if(C == "Blue"){
        console.log(R>G?G:R);
    }else if(C=="Red"){
        console.log((G>B?B:G))
    }else if(C=="Green"){
        console.log((R>B?B:R))
    }
    // console.log(inputArray);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
