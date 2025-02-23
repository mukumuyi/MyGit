function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S  = input.split("\n")[0];
    let seq =0;
    let result = "";
    // let Start =0,End=3*10**5;

    for(let i=0;i<S.length;i++){
        if(S[i]=="W"){
            seq += 1
            // console.log("1")
        } else if(S[i]=="A"){
            result += "A" + "C".repeat(seq);
            seq = 0;
            // console.log("2")
        } else {
            result += "W".repeat(seq) + S[i]
            seq = 0
            // console.log("4")
        }
    }
    if(seq>0){
        result += "W".repeat(seq)
    }
    console.log(result);
    // console.log(S.indexOf("WA"));

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}
// const input = "WA".repeat(150000) + "A" + "W" + "A"
// const input = "W".repeat(300000) + "A" + "W" + "A"
// const input ="WACWA"
// console.log(new Date())
// Main(input)
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
// console.log(new Date())