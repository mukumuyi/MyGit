function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const N = parseInt(inputArray[0]);
    const S = (inputArray[1]);
    const T = []
    let med  =0;
    let sum = 0;
    let sum2 = 0;

    for(let i=0;i<N;i++){
        if(S[i]==1){
            T.push(i)
        }
    }

    // console.log(T)
    for(let i=T[0];i<T[T.length-1] - T.length + 2;i++){
        const T2 = [...Array(T.length)].map((_,j) => j + i)
        // console.log(T2)
        let tmp=0;
        for(let i=0;i<T.length;i++){
            tmp += Math.abs(T[i]-T2[i])
        }
        if(sum > tmp || sum ==0){
            sum = tmp
        }
    }
    console.log(sum)

    // med = (T[0] + T[T.length-1]) / 2
    // console.log("med:",med)

    // for(let i=0;i<T.length;i++){
    //     console.log(T[i])
    //     if(Math.abs(T[i]-med)>1){
    //         sum2 += Math.abs(T[i] - med)-1;
    //     }
    // }

    // console.log(sum2)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

// const N = Math.floor(Math.random()*10);
// let S = ""
// for(let i=0;i<N;i++){
//     S += Math.floor(Math.random()*2)
// }

// const N = 6
// const S = "111010"
// console.log(N + "\n" + S)
// Main(N + "\n" + S);

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
