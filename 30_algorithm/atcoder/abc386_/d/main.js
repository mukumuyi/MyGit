function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n"); 
    const [N,M] = inputArray[0].split(" ").map(Number);
    // console.log(N,M);
    const B=[];
    const W=[];
    let Temp =[]

    for(let i=1;i<=M;i++){
        Temp = inputArray[i].split(" ")
        if(Temp[2]=="B"){
            B.push([parseInt(Temp[0]),parseInt(Temp[1])])
        } else {
            W.push([parseInt(Temp[0]),parseInt(Temp[1])])
        }
    }
    // console.log(B)
    // console.log(W)
    for(let j=0;j<W.length;j++){
        // console.log(W[j])
        for(let k=0;k<B.length;k++){
            if(W[j][0]<=B[k][0] && W[j][1]<=B[k][1]){
                console.log("No")
                return
            }
        }
    }
    console.log("Yes")

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
