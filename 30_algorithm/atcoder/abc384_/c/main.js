function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const H = inputArray[1].split(" ")
    const A =[]
    const MAX = 3000
    let Max = 1
    let Temp = 1
    
    for(let i=1;i<=MAX;i++){
        for(let j=0;j<N;j++){
            Temp = 1
            if(H[j]==H[j+i]){
                Temp+=1
                k=j+i
                while(k<N){
                    // console.log("K:",k)
                    if(H[k]==H[k+i]){
                        Temp += 1
                        k += i
                    } else {
                        break
                    }
                }
                if(Max<Temp){
                    Max = Temp
                }
            } 
            // console.log(i,j,Temp,Max)
        }
    }

    console.log(Max)


}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
