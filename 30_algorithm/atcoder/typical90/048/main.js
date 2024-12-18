

function Main(input) {
    const inputArray = input.split("\n");
    const [N,K] = inputArray[0].split(" ").map(Number);    

    const tempArray = new Array(N)
    const score = [];
    let sum = 0;

    for (let i=0;i<N;i++){
        score[i] = inputArray[i+1].split(" ").map(Number)[1];
        score[N+i] = inputArray[i+1].split(" ").map(Number)[0] - inputArray[i+1].split(" ").map(Number)[1];
        // tempArray[i]= new Array(K).fill(0)
    }
    const temp = score.sort((a,b)=>b - a)

    for (let j=0; j<K;j++){
        sum += temp[j]

    }

    console.log(sum)

    
    // tempArray[0][0] = score[0][1];
    // tempArray[0][1] = score[0][0];

    // console.log(tempArray);
    // for(let j=1;j<N;j++){
    //     // for(let k=0;k<K;k++){
    //     for(let k=0;k< Math.min(K,2 * (j+1));k++){
    //     // for(let k=Math.min(K-3,2*j-1);k<Math.min(K,2*j+2);k++){
    //     // for(let k=Math.min(K-3,2*j-1);k<K;k++){
    //         if(k==0){
    //             tempArray[j][k] = Math.max(tempArray[j-1][k],score[j][1]);
    //         } else if(k==1){
    //             tempArray[j][k] = Math.max(tempArray[j-1][k],tempArray[j-1][k-1] + score[j][1],score[j][0]);
    //         } else {
    //             tempArray[j][k] = Math.max(tempArray[j-1][k],tempArray[j-1][k-1] + score[j][1],tempArray[j-1][k-2] + score[j][0]);
    //         }
    //     }
    // }
    // // console.log(tempArray)
    // console.log(tempArray[N-1][K-1]);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
