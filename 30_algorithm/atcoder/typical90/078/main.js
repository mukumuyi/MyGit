function Main(input) {
    inputArray = input.split("\n");
    const N = parseInt(inputArray[0].split(" ")[0]);
    const M = parseInt(inputArray[0].split(" ")[1]);
    const graphArray = Array.from({ length: M + 1 }, () => Array().fill());
    let count = 0;

    for(let i=0;i<M;i++){
        graphArray[parseInt(inputArray[i+1].split(" ")[0])-1].push(parseInt(inputArray[i+1].split(" ")[1]))
        graphArray[parseInt(inputArray[i+1].split(" ")[1])-1].push(parseInt(inputArray[i+1].split(" ")[0]))
    }

    for (let j=0;j<N;j++){
        // console.log(graphArray[j]);
        let graphElements = graphArray[j].filter((element) => element < j + 1);
        // console.log("Filter:" + graphElements)
        // console.log(graphElements.length)
        if(graphElements.length==1){
            count += 1;
        }
    }

    console.log(count)

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
