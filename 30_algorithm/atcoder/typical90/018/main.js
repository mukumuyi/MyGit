const { METHODS } = require("http");

function Main(input) {
    inputArray = input.split("\n");
    const T = parseInt(inputArray[0]);
    const [L,X,Y] = inputArray[1].split(" ").map(Number);
    const Q = parseInt(inputArray[2]);
    let ganma = 0;
    let cod;
    
    // console.log(T,"L : "+L,"X : " + X,"Y : "+Y,Q);
    for(i=0;i<Q;i++){
        ganma = (3 / 2 * Math.PI - parseInt(inputArray[i+3])/ T * Math.PI * 2) % (2 * Math.PI);
        cod = {x:0,y:L / 2 * (Math.cos(ganma)),z :L / 2 * (Math.sin(ganma)) + L / 2 }
        // console.log(ganma,cod)
        // console.log(cod)

        // aCosNum = L / (Math.sqrt((X - cod.x)**2 +(Y - cod.y)**2 +(0 - cod.z)**2) ) / 2
        aTanNum = (cod.z) / Math.sqrt(X**2 + (Y-cod.y)**2)
        // console.log(aSinNum)
        console.log(Math.atan(aTanNum) * 180 / Math.PI)


    }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
