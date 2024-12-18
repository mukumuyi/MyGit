function Main(input) {

const inputArray = input.split("\n");
let S = (inputArray[0]);
let T = (inputArray[1]);
let cnt = S.length;
let j = 0;
let X = [];

for(i=0;i<S.length;i++){
    if(S[i]==T[i]){
        cnt -= 1;
    } else if(S[i]>T[i]){
        S=S.slice(0,i) + T[i] +S.slice(i+1,S.length)
        X[j]=S
        j += 1
    } 
}

for(i=S.length-1;i>=0;i--){
    if(S[i]<T[i]){
        S=S.slice(0,i) + T[i] +S.slice(i+1,S.length)
        X[j]=S
        j += 1
    }
}

console.log(cnt)
X.map((x)=>{
    console.log(x)
})

//出力
// console.log(totalCnt)
// console.log(output);
// return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
