function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [N,M] = inputArray[0].split(" ").map(Number);
    const G =new Array(N)
    let cnt =0;
    for(let i=0;i<N;i++){
        G[i]=new Set()
    }

    for (let i=0;i<M;i++){
        const [u,v] = inputArray[i+1].split(" ").map(Number);
        if(u!=v){
            G[u-1].add(v);
            G[v-1].add(u);
        }
        // console.log(inputArray[i+1].split(" "));
    }


    for(let i=0;i<N;i++){
       cnt +=  G[i].size;
    }

    console.log(M-cnt/2)
    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
