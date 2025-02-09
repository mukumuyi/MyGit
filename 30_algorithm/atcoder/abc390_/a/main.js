function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n")[0].split(" ").map(Number)
    // const [A,B,C] = parseInt(inputArray[0])
    // console.log(inputArray)
    let cnt = 0;
    let flg = 0;
    for (let i=0;i < 5;i++){
        if(inputArray[i] != i+1){
            if(inputArray[i] == i+2 && inputArray[i+1]==i+1){
                flg = 1
            }
            // console.log(inputArray[i])
            cnt += 1
        }
    }
    // console.log(inputArray)

    if(cnt==2 && flg ==1){
        console.log("Yes")
    } else {
        console.log("No")
    }
    
    
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
