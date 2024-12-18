function cloneArray(array) {
    let clone = [];
    array.forEach((item) =>
      Array.isArray(item) ? clone.push(cloneArray(item)) : clone.push(item)
    );
    return clone;
  }

function UpdateArray(Cood,S,D,H,W){
    console.log(Cood,D)
    const Sx = cloneArray(S)
    console.log(Sx)
    // for(let j=(Cood[0] - D < 0 ? 0 :Cood[0] - D);j<Cood[0] + D;j++){
    for(let j=-D;j<D+1;j++){
        for(let k=D -Math.abs(j);k<D - Math.abs(j) + 1;j++){
            console.log('TT : ',j,k)
            console.log(Cood[0] + j,Cood[1] + k)
            if(Cood[0] + j >= 0 && Cood[0] + j < H && Cood[1] + k >=0 && Cood[1] + k <W){
                if(Sx[Cood[0] + j][Cood[1] + k]=='.'){
                    Sx[Cood[0] + j][Cood[1] + k]='x'
                }
            }
        }

    }

    // for(let j=(Cood[0] - D < 0 ? 0 :Cood[0] - D);j<(Cood[0] + D + 1 > H ? H :Cood[0] + D + 1);j++){
    //     for(let k=(Cood[1] - D - j + Cood[0] < 0 ? 0 :Cood[1] - D - j + Cood[0] );k<Cood[1] + D;k++){
    //         console.log(j,k)
    //         if(Sx[j][k]=='.'){
    //             Sx[j][k]='x'
    //         }
    //     }
    // }
    return Sx
}

function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray = input.split("\n");
    const [H,W,D] = inputArray[0].split(" ").map(Number)
    // console.log(S);|----------|
    let S = []
    const Temp = []
    let Blk = []
    let Temp1,Temp2;
    let sum = 0;
    let max = 0;

    for(i=0;i<H;i++){
        // console.log(inputArray[i+1].split(""))
        S.push(inputArray[i+1].split(""))
        Temp.push(inputArray[i+1].split(""))
    }

    for(let j=0;j<H;j++){
        for(let k=0;k<W;k++){
            if(S[j][k]=='.'){
                Blk.push([j,k])
            }
        }
    }
    // console.log(Blk)
    Blk=[[1,3],[4,2]]

    for(let i=0;i<Blk.length-1;i++){
        Temp1 = Blk[i]
        S1 = UpdateArray(Blk[i],S,D,H,W)
        for(let j=i+1;j<Blk.length;j++){
            Temp2 = Blk[j]
            S2 = UpdateArray(Blk[j],S1,D,H,W)
            console.log(Blk[i],Blk[j])
            console.log(S1)
            console.log(S2)
            sum = 0
            for(let k=0;k<H;k++){
                for(let l=0;l<W;l++){
                    if(S2[k][l]=='x'){
                        sum += 1
                    }

                }
            }
            if(sum>max){
                max = sum
            }
        }
    }

    console.log(max)

    // console.log(S)
    // S = UpdateArray([0,0],S,D)
    // S = UpdateArray([1,0],S,D)
    // S = UpdateArray([0,4],S,D)
    // S = UpdateArray([1,1],S,D)

    // console.log(S)
    // console.log(Temp)
}

// const input= '2 5 1\n.###.\n.#.##'
const input= '5 5 2\n.#.#.\n.....\n.#.#.\n#.#.#\n.....'
Main(input)

// Main(require("fs").readFileSync("/dev/stdin", "utf8"));
