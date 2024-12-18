function Main(input) {
    const N = parseInt(input.split("\n")[0]);
    // console.log(N);
    let temp = N;
    const pnArray =[];

    while(temp > 1) {
        for (let i = 2;i <= temp;i++){
            if(temp % i == 0){
                pnArray.push(i)
                temp = temp / i
                break;
            }
            if(i > Math.sqrt(temp)){
                pnArray.push(temp)
                temp = temp / temp;
                break;
            }
        }
        // console.log('TEMP : ' ,temp)
    }

    console.log(Math.ceil(Math.log2(pnArray.length)))
    return 
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
