function Main(input) {
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const inputSet = new Set();
    let output = "";
    let preSize = 0;

    for (let i = 1; i < N + 1; i++) {
        inputSet.add(inputArray[i])
        if (inputSet.size != preSize) {
            if (output.length != 0) {
                output += "\n"
            }
            output += String(i)
        }
        preSize = inputSet.size;
    }

    console.log(output)
    // return output
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
