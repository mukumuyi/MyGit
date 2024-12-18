function Main(input) {
    const inputArray = input.split(" ");
    const H = parseInt(inputArray[0]); 
    const W = parseInt(inputArray[1]);

    console.log(H == 1 ? W : W ==1 ? H : (Math.ceil(H / 2) * Math.ceil(W / 2)));

    // console.log(H,W);
}

function MakeTestData(a,b) {
    const H = Math.floor(Math.random() * (a - b + 1)) + b
    const W = Math.floor(Math.random() * (a - b + 1)) + b
    // console.log(H)
    return H + " " + W
}

// const [a,b] = [10,1]
// const testData = MakeTestData(a,b);
// console.log(testData)
// Main(testData) 

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
