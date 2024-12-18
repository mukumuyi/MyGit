function Main(input) {

    const startDate = new Date();
    let tempDate;
    let stepNum = 0;

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const Q = parseInt(inputArray[N + 1]);
    const scoreArray = [];
    let output = "";
    let startIndex, endIndex, sum1, sum2;
    // console.log(inputArray);
    // console.log(Q)

    // make array class score per person (O(n))
    for (let i = 1; i < N + 1; i++) {
        scoreArray[i - 1] = inputArray[i];
        // console.log(inputArray[i]);
    }
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    // make answer array per question(O(q))
    for (let j = 0; j < Q; j++) {
        [startIndex, endIndex, sum1, sum2] = [parseInt(inputArray[N + 2 + j].split(" ")[0]), parseInt(inputArray[N + 2 + j].split(" ")[1]), 0, 0]
        // console.log(inputArray[N+2+j])
        // console.log(startIndex,endIndex)
        // summary score per date (O(n))
        for (let k = startIndex - 1; k < endIndex; k++) {
            if (scoreArray[k].split(" ")[0] == "1") {
                sum1 += parseInt(scoreArray[k].split(" ")[1]);
            } else {
                sum2 += parseInt(scoreArray[k].split(" ")[1]);
            }
        }
        // outputArray[j] = sum1 + " " + sum2;
        output += sum1 + " " + sum2;
        output += "\n";
    }
    [tempDate, stepNum] = [new Date(), stepNum + 1]
    console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    //出力
    // console.log(output);
    return output;
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
