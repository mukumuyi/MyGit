const { log } = require("console");

function Main(input) {

const inputArray = input.split("\n");
const [H,W,Q] = (inputArray[0].split(" ").map(Number));
const Grid = new Array(H)
const Ope =[];

for(let h=0 ;h<H;h++){
    Grid[h] = new Array(W).fill(1)
}

console.log(Grid)

for(i=0;i<Q;i++){
    Ope[i] = inputArray[i+1].split(" ").map(Number);
    if(Grid[Ope[i][0]-1][Ope[i][1]-1]==1){
        Grid[Ope[i][0]-1][Ope[i][1]-1] = 0
    } else {
        if(Ope[i][0]-2>=0) {
            Grid[Ope[i][0]-2][Ope[i][1]-1]=0
        }
        if(Ope[i][0]<H) {
            Grid[Ope[i][0]][Ope[i][1]-1] = 0
        }
        if(Ope[i][1]-2>=0) {
            Grid[Ope[i][0]-1][Ope[i][1]-2] = 0
        }
        if(Ope[i][1]<W) {
            Grid[Ope[i][0]-1][Ope[i][1]] = 0
        }
    }
    
}


console.log(Ope)
console.log("===Output===")
console.log(Grid)

let sum = 0;

for(let h=0 ;h<H;h++){
    sum += Grid[h].reduce((sum, num) => sum + num, 0);
}

console.log(sum)


// console.log(H,W,Q)
// console.log(diffArray)
// console.log(cnt)

//出力
// console.log(totalCnt)
// console.log(output);
// return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
