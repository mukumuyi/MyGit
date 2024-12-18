// oj-t-js テストコマンド
// acc-s-js 提出コマンド
// inputに入力データ全体が入る
function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    const startDate = new Date();
    let tempDate;
    let stepNum = 0;

    [tempDate, stepNum] = [new Date(), stepNum + 1]
    // console.log("= Step", stepNum, " : ", tempDate.getTime() - startDate.getTime(), " =");

    const inputArray = input.split(" ");
    const A = BigInt(inputArray[0]);
    const B = BigInt(inputArray[1]);
    const C = BigInt(inputArray[2]);
    const tempArray = [A,B,C].sort((a,b)=> {
        if(a > b) {
          return -1;
        } else if (a < b){
          return 1;
        } else {
          return 0;
        }
      })
    let tmp = 0;

    // console.log(tempArray);
    
    // A,B,Cの最大公約数Qを算出する。
    while (tempArray[0] != tempArray[2] && tempArray[1] != 1n){
        tmp = tempArray[0] - (tempArray[1]==tempArray[0]?tempArray[2]:tempArray[1])
        tempArray.shift()
        tempArray.push(tmp)
        tempArray.sort((a,b)=> {
            if(a > b) {
              return -1;
            } else if (a < b){
              return 1;
            } else {
              return 0;
            }
          } )
        // console.log(tempArray)
    }   
    const Q = tempArray[2];
        
    // console.log(Q)

    // 回数 ＝ (A / Q - 1) + (B / Q - 1) + (C / Q - 1) 
    output = ((A / Q - 1n) + (B / Q - 1n) + (C / Q - 1n)).toString();

    //出力
    console.log(output);
    // return output;

}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
// oj-t-js
// acc-s-js
