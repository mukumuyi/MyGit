function Main(input) {
    const inputArray = input.split("\n")
    const [N,M] = inputArray[0].split(" ").map(Number);
    const A = [];
    const B = [];
    let strA="";
    let strB="";

    for(let i=0 ;i<M;i++){
        strB += inputArray[i+N+1]
    }

    for(let j = 0;j <= N-M;j++){
        for(let k = 0;k<=N-M;k++){
            strA =""
            for(let l=0;l<M;l++){
                strA += inputArray[l+k+1].substring(j,j + M)
            }  
            if(strA==strB){
                console.log(k+1,j+1)
            }       
        }
    }



}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
