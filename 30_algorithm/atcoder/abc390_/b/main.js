function Main(input) {
    const N = parseInt(input.split("\n")[0])
    const inputArray = input.split("\n")[1].split(" ").map(Number);

    // console.log(N)
    // console.log(inputArray)

    let flg = 0
    let A = 0;

    for(let i=0;i < N;i++){
        if(i==0){
            A = inputArray[1] / inputArray[0]
        } else if(inputArray[i] != inputArray[i-1] * A) {
            flg = 1
        }
        
    }
    if(flg==0){
        console.log("Yes")
    } else {
        console.log("No")
    }
}

// const input= '2 5 1\n.###.\n.#.##'
// const input= '5 5 2\n.#.#.\n.....\n.#.#.\n#.#.#\n.....'
// Main(input)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
