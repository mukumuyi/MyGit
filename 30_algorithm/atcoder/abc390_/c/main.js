function Main(input) {
    inputArray = input.split("\n");
    const [H,W] = inputArray[0].split(" ").map(Number);
    let xMinB = W-1;
    let xMaxB = 0;
    let yMinB = H-1;
    let yMaxB = 0;
    let msg = 'Yes'
    // console.log(H,W)
    for(let i=0;i<H;i++){
        for(let j=0;j<W;j++){
            if(inputArray[i+1][j]=='#'){
                // console.log(i+1,j+1)
                if(xMinB > j){
                    xMinB = j 
                }
                if(xMaxB < j){
                    xMaxB = j
                }
                if(yMinB > i){
                    yMinB = i
                }
                if(yMaxB < i){
                    yMaxB = i
                }   
            } 
            // console.log(inputArray[i+1][j])
        }
    }

    // console.log(xMinB,xMaxB,yMinB,yMaxB)

    for(let i=yMinB;i<=yMaxB;i++){
        for(let j=xMinB;j<=xMaxB;j++){
            if(inputArray[i+1][j]=='.'){
                msg = 'No'
            } 
            // console.log(inputArray[i+1][j])
        }
    }
    console.log(msg)

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
