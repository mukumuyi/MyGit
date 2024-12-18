function Main(input) {
    const temp = input.split("\n");
    const N = temp[0].split(" ")[0];
    const K = temp[0].split(" ")[1];
    const arrayA = temp[1].split(" ");
    const arrayB = temp[2].split(" ");
    let sumAbs = 0
    // console.log(arrayA);
    // console.log(arrayB);
    for(let i = 0; i < N ; i++){
        sumAbs += Math.abs(arrayA[i] - arrayB[i]);
    }
    const output = (sumAbs <= K && sumAbs % 2 == K % 2 ? "Yes" : "No");
    console.log(output)
    // return output
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
