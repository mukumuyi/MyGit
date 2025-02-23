function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const keyBoard  = input.split("\n")[0];
    const inputArray="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let tmpBef,result=0;
    for(let i=0;i<26;i++){
        const tmp = keyBoard.indexOf(inputArray[i])
        if(i!=0){
            result += Math.abs(tmpBef-tmp)
            // console.log(inputArray[i],tmpBef,tmp,Math.abs(tmpBef-tmp))
        }
        tmpBef = tmp;
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
