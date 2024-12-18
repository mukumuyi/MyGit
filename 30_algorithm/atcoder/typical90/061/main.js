function Main(input) {
    const inputArray = input.split("\n");
    const Q = inputArray[0];
    const tempArray =[];
    let T,X;
    for(let i=0;i < Q ; i++){
        [T,X] = inputArray[i+1].split(" ").map(Number)
        if(T===1){
            tempArray.unshift(X)
        }else if (T===2){
            tempArray.push(X)
        }else {
            console.log(tempArray[X-1])
        }
    }

    // console.log(input);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
