function Main(input) {
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0])
    const A = inputArray[1].split(" ").map(Number);
    const B = [];
    let temp=0;
    let k ,cnt;
    let flg = true;
    const Target = A.reduce((a,c) => a+c) / 10;
    // console.log(Target);
    if(Target != Math.floor(Target)){
        console.log("No");
        return
    }

    for(let i = 0 ; i < N * 2;i++){
        temp += A[i>=N?i-N:i]
        B.push(temp)
    }


    for(let j = 0;j < N * 2;j++){
        //  j >= N : j - N + 1 ~ j
        //  j < N : 0 ~ j
        l = j >= N ? j - N + 1 : 0
        k = j
        // console.log(j,k)
        while(k-l+1>=1){
            m = Math.floor((l+k)/2)
            if(B[j]-B[m]==Target){
                console.log("Yes")
                // console.log(j,m)
                return
            } else if(B[j]-B[m]>Target){
                l = m + 1
            } else {
                k = m - 1                
            }
        }
    }
    console.log("No");
    return

}
const N = 10
// const N = Math.ceil(Math.random() * (10 ** 1))
let A = "";
let temp;
let sum = 0;
for(let i = 0 ;i < N - 1 ;i++){
    temp = Math.ceil(Math.random() * (10 ** 1))
    A += temp.toString() 
    A += " "
    sum += temp
}
// console.log(sum)
// console.log(10 - sum % 10)
A += (10 - sum % 10).toString() 
const input = N.toString() +"\n"+A
// console.log("Target : ",(sum + 10 - sum % 10)/10)
// console.log(input)

// const start = new Date()
// console.log(N)
// Main(input)
// const end = new Date()
// console.log(end - start)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
