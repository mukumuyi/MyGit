function Main(input) {

    const inputArray = input.split("\n");
    const [H,W,X,Y] = inputArray[0].split(" ").map(Number)
    const S = []
    const T = inputArray[H+1].split("")
    let TempX = X - 1
    let TempY = Y - 1
    let C = 0


    for(i=0;i<H;i++){
        S.push(inputArray[i+1].split(""))
    }
    
    // console.log(H,W,X,Y)
    // console.log(S)
    // console.log(T)
    for(let j=0;j<T.length;j++){
        // console.log("TEST",S[TempX][TempY],TempX,TempY,C)

        if(T[j]=='U' && S[TempX-1][TempY]!='#'){
            TempX -= 1
            if(S[TempX][TempY]=='@'){
                S[TempX][TempY]='.'
                C += 1
            }
        } else if(T[j]=='D' && S[TempX+1][TempY]!='#'){
            TempX += 1
            if(S[TempX][TempY]=='@'){
                S[TempX][TempY]='.'
                C += 1
            }
        } else if(T[j]=='L' && S[TempX][TempY-1]!='#'){
            TempY -= 1
            if(S[TempX][TempY]=='@'){
                S[TempX][TempY]='.'
                C += 1
            }
        } else if(T[j]=='R' && S[TempX][TempY+1]!='#'){
            TempY += 1
            if(S[TempX][TempY]=='@'){
                S[TempX][TempY]='.'
                C += 1
            }
        }

    }
    console.log(TempX+1,TempY+1,C)

}

// const input= '2 5 1\n.###.\n.#.##'
// const input= '5 5 2\n.#.#.\n.....\n.#.#.\n#.#.#\n.....'
// Main(input)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
