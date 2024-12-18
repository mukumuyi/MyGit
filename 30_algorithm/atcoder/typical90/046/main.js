function Main(input) {
    inputArray = input.split("\n");
    const N= parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(Number);
    const B = inputArray[2].split(" ").map(Number);
    const C = inputArray[3].split(" ").map(Number);
    let count =0;

    const AM = Array(46).fill(0)
    const BM = Array(46).fill(0)
    const CM = Array(46).fill(0)

    for (let i=0;i<A.length;i++){
        AM[A[i] % 46] += 1
    }

    for (let i=0;i<B.length;i++){
        BM[B[i] % 46] += 1
    }

    for (let i=0;i<C.length;i++){
        CM[C[i] % 46] += 1
    }

    for(let i=0;i<46;i++){
        for(let j=0;j<46;j++){
            for (let k=0;k<46;k++){
                if((i + j + k) % 46===0)
                {count += AM[i] * BM[j] * CM[k]}
            }
        }

    }
    console.log(count);

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
