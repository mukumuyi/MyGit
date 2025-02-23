function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [S,T] =inputArray[0].split(" ");
    let result = "No"
    for(let i=1;i<S.length;i++){
        for(let k=i;k>0;k--){
            let tmp=""
            for(let j=0;j<S.length/i;j++){
                // console.log(i,k)
                tmp += S[i*j+k-1] ? S[i*j+k-1] : ""
            }
            // console.log(tmp)
            if(tmp==T){
                result = "Yes"
            }
        }
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
