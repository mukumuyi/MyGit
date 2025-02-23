function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S  = input.split("\n")[0];
    let cnt = 0;
    for(let i=0;i<S.length;i++){
        if(S[i]=='A'){
            for(let j=i+1;j<S.length;j++){
                if(S[j]=='B'){
                    for(let k=j+1;k<S.length;k++){
                        if(S[k]=='C' && j-i == k-j){
                            cnt += 1
                        }
                    }
                }
            }
        }
    }

    console.log(cnt)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
