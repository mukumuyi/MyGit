function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const [N , M]= inputArray[0].split(" ").map(Number);
    const Flag = Array(N)
    Flag.fill(0)
    const A =[]
    // console.log(Flag)
    for(i=0;i < M ;i++){
        if(inputArray[i+1].split(" ")[1]=="M" && Flag[parseInt(inputArray[i+1].split(" ")[0])-1] == 0){
            console.log("Yes")
            Flag[parseInt(inputArray[i+1].split(" ")[0])-1] = 1
        } else {
            console.log("No")
        }
    }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
