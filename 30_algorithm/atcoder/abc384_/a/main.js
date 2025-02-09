function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const [A,B,C] = input.split("\n")[0].split(" ").map(Number)
    // const [A,B,C] = parseInt(inputArray[0])
    if(A==B && B==C){
        console.log("Yes")
    } else if((A+B+C)%2==0 && ((A+B+C)/2==A || (A+B+C)/2==B ||(A+B+C)/2==C )){
        console.log("Yes")
    } else {
        console.log("No")
    }
    
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
