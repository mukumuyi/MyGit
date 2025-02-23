function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S  = input.split("\n")[0];
    // console.log(S)
    const T =[];
    let result = "Yes"
    for(let i=0;i<S.length;i++){
        if(S[i]=="[" || S[i]=="(" || S[i]=="<"){
            T.push(S[i])
        } else {
            const x = T.pop()
            if(!(x=="[" && S[i]=="]" 
                || x=="(" && S[i]==")"
                || x=="<" && S[i]==">")){
                    result = "No"
                    break
                }
        }
    }
    if(T.length!=0){
        result = "No"
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

// Main("<")

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
