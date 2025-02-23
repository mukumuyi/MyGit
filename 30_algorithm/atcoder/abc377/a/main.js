function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const S = inputArray[0];
    let T = [0,0,0]
    for(let i=0;i <3;i++){
        if(S[i]=="A"){
            T[0] = 1;
        } else if (S[i]=="B"){
            T[1] = 1;
        } else if (S[i]=="C"){
            T[2] = 1;
        } 
    }
    console.log(T[0]+T[1]+T[2]==3?"Yes":"No");

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
