function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const K = parseInt(inputArray[0]);
    const S = inputArray[1]
    const T = inputArray[2]
    let checkFlag = 0
    let j=0
    let k=0

    if(S==T){
        console.log("Yes")
        return
    } else if (S.length==T.length){
        for(let i=0;i<S.length;i++){
            if(S[i]!=T[i]){
                checkFlag += 1
            }
        }
        if(checkFlag==K){
            console.log("Yes")
            return
        }
    } else if (S.length-T.length<=K && S.length-T.length > 0){
        while(k<T.length && checkFlag <= K){
            // console.log(S[k])
            if(S[j]==T[k]){
                j+=1
                k+=1
            } else if(S[j+1]==T[k]){
                j+=2
                k+=1
                checkFlag+=1
            } else {
                break
            }
        }
        if(k==T.length){
            console.log("Yes")
            return
        }

    } else if (T.length-S.length<=K && T.length-S.length > 0){
        while(k<S.length && checkFlag <= K){
            // console.log(S[k],T[j],T[j+1])
            if(T[j]==S[k]){
                j+=1
                k+=1
                // console.log("T1")
            } else if(T[j+1]==S[k]){
                j+=2
                k+=1
                checkFlag+=1
                // console.log("T2")
            } else {
                break
            }
        }
        if(k==S.length){
            console.log("Yes")
            return
        }

    }

    console.log("No")


}


// console.log(String.fromCharCode(97))

// const a = "leap"
// const b = "read"
// const input = "1\n"+ a +"\n"+ b

// Main(input)

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
