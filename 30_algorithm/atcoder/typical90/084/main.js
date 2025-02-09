function Main(input) {
    const [N,S] = input.split("\n");
    let tempSet;
    let cnt = 0;

    // console.log(N,S);

    for(let i = 0 ; i < N ;i++){
        for (let j = i;j<N;j++){
            // tempSet = new Set(S.slice(j,i+1).split(""))
            // console.log("IN:",S.slice(i,j+1))
            // console.log(S[i],S[j])
            if(S[i]!=S[j]){
                // console.log(S.slice(i,j+1))
                // console.log(i,j,N)
                cnt += N - j
                break
            }
        }
    }
    console.log(cnt)
}


// const input = "4\nooxo"
// console.log("12345".slice(0,5))
// Main(input);
Main(require("fs").readFileSync("/dev/stdin", "utf8"));

