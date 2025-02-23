function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const R  = parseInt(input.split("\n")[0]);
    let result = 0;
    if(R <= 99){
        result = 100-R
    }else if(R<=199){
        result = 200-R
    }else if(R <= 299){
        result = 300- R
    }else if (R <=399){
        result = 400 -R
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
