function Main(input) {
    // const startDate = new Date();
    // let tempDate;
    // let stepNum = 0;
    inputArray = input.split("\n");
    const [N,K] = inputArray[0].split(" ").map(Number);
    const S = inputArray[1]
    const Start = S[0];
    let temp = S[0];    
    let tempX = "";   
    let temp0 = "";
    let temp1 = "";
    let result ="";
    let counter0 = 1 ;
    let counter1 = Start==1 ? 0 : 1;

    for(let i = 0; i<N ;i++){
        if(temp == S[i]){
            tempX += S[i];
        } else {
            if(temp == "1"){
                counter1 += 1
                temp1 = tempX
            } else {
                counter0 += 1
                temp0 = tempX
            }
            // console.log(counter0,counter1)
            // console.log("temp : " ,temp0,temp1)
            if(Start==1 & counter1 ==0){
                result += temp1
            }
            if(counter0 == counter1){
                if(counter0 ==K+1-Start ){
                    result += temp1
                    result += temp0    
                } else {
                    result += temp0
                    result += temp1    
                }
            }
            temp = S[i]
            tempX = S[i]
            // console.log(result)

        }
    }

    // console.log(counter0,counter1)
    if(counter0 == counter1){
        result += tempX
    } else if(counter0 < counter1){
        result += temp1
        result += tempX
    } else if(counter0 > counter1){
        if(counter1==K | counter0==K){
            result += tempX
            result += temp0
        } else {
            result += temp0
            result += tempX
        }
    }

    console.log(result)


}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
