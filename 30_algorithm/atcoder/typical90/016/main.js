function Main(input) {
    inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const coinArray = inputArray[1].split(" ").map(Number).sort((a,b)=>(b-a));
    // console.log(N,coinArray);
    const [A,B,C] = coinArray
    // console.log(A,B,C)
    const AM = Math.floor(N/A)

    // const coinMaxArray = coinArray.map((i) => Math.floor(N / i));
    // const [AM,BM,CM] = coinMaxArray
    // console.log(coinMaxArray)
    let minCount = 9999;
    let temp;
    let temp2;
    // resultSet = new Set()
    // console.log(coinMaxArray)
    let count =0;
    // const startTime = new Date()
    // console.log("befor loop : " + startTime)

    // for (let j=0; j <= coinMaxArray[0];j++){
    for (let j = AM; j >= 0;j--){
        for (let k = Math.floor((N - A * j ) / B); k>=0;k-- ){
        // for (let k = parseInt((N - A * j ) / B); k>=0;k-- ){
        // for (let k = Math.min(parseInt((N - A * j ) / B),BM); k>=0;k-- ){
            temp = (N - A * j - B * k) / C
            temp2 = Math.floor(temp)
            // temp2 = parseInt(temp)
            count += 1
            // console.log(j,k,temp/coinArray[2])

            if(temp === temp2){
            // if((N - A * j - B * k) % C ==0) {
                // console.log(j,k,temp/coinArray[2])
                // // console.log(j + k + temp/coinArray[2])
                if(minCount > j + k + temp2){
                    minCount = j + k + temp2
                }
                // minCount = Math.min(minCount , j + k + temp2)
                // resultSet.add(j + k + parseInt((N - A * j - B * k) / C))
                // resultSet.add(j + k + temp2)
                break;  
                // break loop;
            }
        }
    }
    
    // const endTime = new Date()
    // console.log("loop end : " + endTime)

    // console.log(Math.min(...resultSet))

    console.log(minCount)
    // console.log(count)
    // console.log((endTime - startTime ) / count)


}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
