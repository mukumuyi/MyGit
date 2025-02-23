function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const S = input.split("\n")[0];
    let result = "Yes"
    const A = []
    if (S.length % 2 == 0) {
        for (let i = 0; i < (S.length / 2); i++) {
            if (S[2*i] != S[2*i+1]) {
                result = "No"
            }
            // console.log("S:",S[2*i]," ",result)
            A.push(S[2*i])
        }
        const B = new Set(A)
        // console.log(A.length)
        // console.log(B.size)
        if (B.size != A.length) {
            result = "No"
        }

    } else {
        result = "No"
    }
    console.log(result);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
