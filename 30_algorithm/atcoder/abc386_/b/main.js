function Main(input) {

    const inputArray = input.split("\n")[0].split("").map(Number);

    // console.log(inputArray)
    let i=0;
    let j=0;

    while(i<inputArray.length){
        // console.log(inputArray[i])
        if(inputArray[i]==0 && inputArray[i+1]==0){
            i+=1
        }
        j+=1
        i+=1
    }

    console.log(j)   

}

// const input= '2 5 1\n.###.\n.#.##'
// const input= '5 5 2\n.#.#.\n.....\n.#.#.\n#.#.#\n.....'
// Main(input)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
