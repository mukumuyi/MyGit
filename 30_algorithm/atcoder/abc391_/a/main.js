function Main(input) {
    const D = input.split("\n")[0]
    // const [A,B,C] = parseInt(inputArray[0])
    // console.log(inputArray)
    let result;
    if(D=="N"){result="S"} else 
    if(D=="E"){result="W"} else 
    if(D=="W"){result="E"} else 
    if(D=="S"){result="N"} else 
    if(D=="NE"){result="SW"} else 
    if(D=="NW"){result="SE"} else 
    if(D=="SE"){result="NW"} else 
    if(D=="SW"){result="NE"} 

    console.log(result)
    
    
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
