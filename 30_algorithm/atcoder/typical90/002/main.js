function Main(input) {
    // input = input.split("\n");
    const N = parseInt(input);
    if(N % 2 == 0){
        // console.log(input);
        for(let i= 2**N-1;i >=  1 << (N-1) ;i--){
            let temp = i.toString(2);
            // if(temp.length == N){
            let sum = 0;
            let result = ""
            // console.log(i.toString(2));
            for(let j = 0 ; j < N & sum >= 0;j++){
                if(temp.split("")[j] == 0){
                    sum -= 1
                    result += ")"
                } else {
                    sum += 1
                    result += "("
                }
            }
            if(sum == 0 ){
                // console.log(i.toString(2));
                console.log(result)
            }
            // }
        }
    } else {
        console.log("")
    }
    // console.log(input);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
