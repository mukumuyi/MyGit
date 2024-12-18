function Main(input) {
    inputArray = input.split("\n");
    const [N,Q] = inputArray[0].split(" ").map(Number);
    const A = inputArray[1].split(" ").map(Number);
    let T,x,y,temp;
    let cnt =0;

    // console.log("COUNT : " + N)
    // console.log("PATERN : " + Q)
    for(i=0;i<Q;i++){
        [T,x,y] = inputArray[i+2].split(" ").map(Number);

        if(T===1){
            [A[(N+x-cnt-1)%N],A[(N+y-cnt-1)%N]]=[A[(N+y-cnt-1)%N],A[(N+x-cnt-1)%N]];
        } else if (T===2){
            cnt += 1
            if(cnt==A.length){
                cnt = 0
            }
            // temp = A.pop();
            // A.unshift(temp);
            // A.reverse().push(temp)
            // A.reverse()
        } else {
            console.log(A[(N+x-cnt-1)%N]);
        }
        // console.log(A)
    }
}


function MakeData(a, b, c, d) {
    // const N = Math.floor(Math.random() * (b - a + 1)) + a;
    const N = 5;
    // const Q = Math.floor(Math.random() * (b - a + 1)) + a;
    const Q = 5;

    let output = "";
    let line = "";
    output += (N + " " + Q);
    output += "\n";

    for (let i = 0; i < N; i++) {
        line += Math.floor(Math.random() * (d - c + 1)) + c;
        line += " "
    }

    output += line

    for (let j = 0; j < Q; j++) {
        output += "\n"
        line = ""
        line += Math.floor(Math.random() * 3) + 1;
        line += " "
        line += Math.floor(Math.random() * N) + 1;
        line += " "
        line += Math.floor(Math.random() * N) + 1;
        output += line
    }

    // console.log(output)
    return output
}
// const start = new Date()
// const input = MakeData(2,200000,1,10);
// // console.log(input)
// Main(input);
// const end = new Date()
// console.log("PROC : " + (end - start))

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
