function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [H,W,D] = inputArray[0].split(" ").map(Number)
    const S = new Array(H)
    let sum = 0;
    let max = 0;

    for(let i=0;i<H;i++){
        for(let j=0;j<W;j++){
            if(inputArray[i+1][j]=='.'){
                for(let k=0;k<H;k++){
                    for(let l=0;l<W;l++){
                        if(inputArray[k+1][l]=='.' && (i!=k || j!=l)){
                            // console.log("1st",i,j,"2nd",k,l)
                            sum =0;
                            for(let m=0;m<H;m++){
                                for(let n=0;n<W;n++){
                                    if((Math.abs(i-m)+Math.abs(j-n)<=D || Math.abs(k-m)+Math.abs(l-n)<=D) &&inputArray[m+1][n]=='.'){
                                        // console.log("3rd",m,n)
                                        sum += 1;
                                    }
                                }
                            }
                            if(max < sum) {
                                max = sum;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(max);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
