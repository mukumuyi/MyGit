function Main(input) {

const inputArray = input.split("\n");
let N = parseInt(inputArray[0]);
let ArrayK = (inputArray[1].split(" ").map(Number));
let ArrayL;
let Total = 0;
let ATotal = 0;
let MaxTemp;
let MinTotal = 2000000000;

for(let i=0;i < ArrayK.length;i++){
    Total += ArrayK[i]
}

for(let i = 0;i < 2 ** N ;i++) { 
    ATotal = 0
    ArrayL = ("0".repeat(N) + i.toString(2)).slice(N * -1).split("").map(Number)
    // console.log(ArrayL)
    for(let j = 0;j<N;j++){
        ATotal += ArrayK[j] * ArrayL[j]
    }
    MaxTemp = (ATotal > (Total - ATotal))?ATotal: (Total - ATotal);
    if(MaxTemp<MinTotal){
        MinTotal = MaxTemp
    }
}

console.log(MinTotal)

}


Main(require("fs").readFileSync("/dev/stdin", "utf8"));
