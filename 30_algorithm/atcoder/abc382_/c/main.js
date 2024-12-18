const { log } = require("console");

function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const [N,M] = inputArray[0].split(" ").map(Number);
    const A = inputArray[1].split(" ").map(Number);
    const B = inputArray[2].split(" ").map(Number);
    const A2 = []
    let temp = 2 * (10 ** 5) + 1;
    let result = -1

    // console.log(N,M,A,B)
    for (let j = 0;j<N;j++){
        if(temp>A[j]){
            A2.push(A[j])
            temp = A[j]
        } else {
            A2.push(temp)
        }
    }

    // console.log(A2)
    let k,l;
    
    for(let i=0;i<M;i++){
        // console.log("B : ",B[i])
        result = -1
        k = N - 1;
        l = 0;
        while(k-l>0){
            // console.log(B[i],A2[Math.floor((k+l)/2)])
            if(B[i] >= A2[Math.floor((k+l)/2)]){
                k = Math.floor((k+l)/2)
            } else {
                l = Math.ceil((k+l)/2)
            }

        }
        // console.log("Target : ",B[i],A2[l],A2[k])
        // console.log("Index : ",k,l)
        if(B[i]>=A2[l]){
            result = l + 1
        } else if(B[i]>=A2[k]){
            result = k + 1
        } 
        console.log(result)
    }

    // console.log("Bad Perform")
    // for(let i=0;i<M;i++){
    //     // console.log("B : ",B[i])
    //     result = -1
    //     for(let j=0;j<N;j++){
    //         if(A[j]<=B[i]){
    //             result = j+1
    //             break;
    //         }
    //     }
    //     console.log(result)
    // }


}

// const X = 2 * (10 ** 1)
// const N = Math.ceil(Math.random() * X)
// const M = Math.ceil(Math.random() * X)
// let A = ""
// for(i=0;i<N;i++){
//     A += Math.ceil(Math.random() * X).toString();
//     A += " "
// }

// let B = ""
// for(i=0;i<M;i++){
//     B += Math.ceil(Math.random() * X).toString();
//     B += " "
// }
// const input=N + " " + M + "\n" + A + "\n" + B

// console.log(input)

// Main(input);

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
