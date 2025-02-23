function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const S = inputArray[0].split(" ");
    // console.log(S);
    let result =3 ;

    if(S[0] == 'sick' && S[1] == 'sick'){
        result = 1
    } else if(S[0] == 'sick' && S[1] == 'fine'){
        result = 2
    } else if(S[0] == 'fine' && S[1] == 'fine'){
        result = 4
    }

    console.log(result)

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
