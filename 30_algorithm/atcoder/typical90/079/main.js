function Main(input) {
    const inputArray = input.split("\n");
    const [H,W] = inputArray[0].split(" ").map(Number);
    const A = []
    const B = []
    const C = []
    const D = []
    const Line = [...Array(H)].map(() => 0)
    const Col = [...Array(W)].map(() => 0)
    let LineEv = 0;
    let LineOd = 0;
    let ColEv = 0;
    let ColOd = 0;
    let temp1,temp2;
    let Cnt = 0;
    for(let i = 0;i<H;i++){
        A.push(inputArray[i+1].split(" ").map(Number))
        B.push(inputArray[i+H+1].split(" ").map(Number))
    }

    for(let i=0 ;i<H;i++){
        D[i]=[]
        for (let j = 0; j<W;j++){
            temp1 = B[i][j]-A[i][j]
            temp2 = temp1 - (j>0?D[i][j-1]:0) - (i>0?D[i-1][j]:0) - (j>0&i>0?D[i-1][j-1]:0)
            D[i].push(temp2)
            Cnt += Math.abs(temp2);
            if(i%2==0){
                LineEv += (temp1)
            } else {
                LineOd += (temp1)
            }
            if(j%2==0){
                ColEv += (temp1)
            } else {
                ColOd += (temp1)
            }
            
        }
    }

    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(Cnt)
    // console.log(Line);
    // console.log(Col)
    // 以下の数値がそれぞれ一致すればOK
    // console.log(LineEv,LineOd) // これが一致
    // console.log(ColEv,ColOd) // これが一致
    if(LineEv==LineOd & ColEv==ColOd){
        console.log("Yes")
        console.log(Cnt)
        return
    } else {
        console.log("No")
        return
    }

}

// const inputData = '3 4' + '\n1 2 3 4\n1 2 3 4\n1 2 3 4\n0 0 0 0\n0 0 0 0\n0 0 0 0';

// const inputData = '3 3' + '\n1 1 0\n1 1 0\n0 0 0\n0 0 0 \n0 0 0\n0 0 0';

// Main(inputData);
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
