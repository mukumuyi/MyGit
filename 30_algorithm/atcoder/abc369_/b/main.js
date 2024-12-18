function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const keyArray = [];
    let L = "";
    let R = "";
    let temp;
    let tired = 0;
    for (let i = 0; i < N; i++) {
        // console.log(inputArray[i + 1])
        temp = inputArray[i + 1];
        if (temp.split(" ")[1] == "L") {
            if (L == "") { L = parseInt(temp.split(" ")[0]) }
            tired += Math.abs(L - parseInt(temp.split(" ")[0]))
            L = parseInt(temp.split(" ")[0])
        } else {
            if (R == "") { R = parseInt(temp.split(" ")[0]) }
            tired += Math.abs(R - parseInt(temp.split(" ")[0]))
            R = parseInt(temp.split(" ")[0])
        }
    }

    //出力
    console.log(tired);
    // return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
