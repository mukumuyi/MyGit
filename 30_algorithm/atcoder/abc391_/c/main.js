function Main(input) {
    inputArray = input.split("\n");
    const [N,Q] = inputArray[0].split(" ").map(Number);
    const A = [...Array(N)].map((_,i)=>i+1)
    const B = [...Array(N)].map((_,i)=>1)
    let Sign,Target,Bef,Aft;
    let Cnt = 0;
    // console.log(B)

    for(let i=0;i<Q;i++){
        [Sign,Target,Aft] = inputArray[i+1].split(" ").map(Number)

        if(Sign==2){
            console.log(Cnt)
        } else {
            Bef=A[Target-1]
            A[Target-1]=Aft
            B[Bef-1] -= 1
            B[Aft-1] += 1
            if(B[Bef-1]==1){
                Cnt -= 1
            }
            if(B[Aft-1]==2){
                Cnt += 1
            }
            // console.log("Number1",A,B)
        }
    }

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
