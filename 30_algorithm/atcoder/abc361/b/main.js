function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    const inputArray  = input.split("\n");
    const [a,b,c,d,e,f] = inputArray[0].split(" ").map(Number);
    const [g,h,i,j,k,l] = inputArray[1].split(" ").map(Number);

    // if(((a-g)*(g-d)>0 && (b-h)*(h-e)>0 && (c-i)*(i-f)>0) || ((a-j)*(j-d)>0 && (b-k)*(k-e)>0 && (c-l)*(l-f)>0)){
    //     console.log("Yes")
    // } else {
    //     console.log("No")
    // }

    if(!(d<=g || a>=j) && !(e<=h || b>=k) && !(f<=i ||c>=l)){
        console.log("Yes")
    } else {
        console.log("No")
    }
    // console.log(inputArray);

    // [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime()," =");

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
