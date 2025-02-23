function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [Xa,Ya] = inputArray[0].split(" ");
    const [Xb,Yb] = inputArray[1].split(" ");
    const [Xc,Yc] = inputArray[2].split(" ");  
    const AB2 = (Xa-Xb)**2 + (Ya-Yb)**2;
    const AC2 = (Xa-Xc)**2 + (Ya-Yc)**2;
    const BC2 = (Xb-Xc)**2 + (Yb-Yc)**2;
    if(AB2+AC2==BC2 || AB2+BC2==AC2 || AC2+BC2==AB2){
        console.log("Yes")
    } else {
        console.log("No")
    }

    // console.log(inputArray);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
