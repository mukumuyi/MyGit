// inputに入力データ全体が入る
function Main(input) {
	// 1行目がinput[0], 2行目がinput[1], …に入る
	input = input.split("\n");
	const tmp = input[0].split(" ");
	// 	行・列定義を取得する。
	const H = parseInt(tmp[0], 10);
	const W = parseInt(tmp[1], 10);
	
// 	二次元配列の初期化
	const inArray = Array.from({ length: H }, () => Array(W).fill(undefined));

// 二次元配列への取込
// ループ１ 1行目～H行目まで
  for (let i = 1;i<=H;i++){
    let line = input[i].split(" "); 
// ループ２ 1列目～W列目まで
    for(let j = 0;j<W;j++){
    inArray[i-1][j] = line[j]
    }
  }
  
  for (let k = 0; k<H; k++){
    let outLine = ""
    for (let l = 0; l <W; l++){
      let sum = 0;
      for (let m = 0 ; m < H ;m++){
        sum += parseInt(inArray[m][l])
      }
      for (let m = 0 ; m < W ;m++){
        sum += parseInt(inArray[k][m])
      }
      sum -= parseInt(inArray[k][l])
      outLine += sum
      outLine += " "
      // console.log(sum)
    }
    console.log(outLine.slice(0,outLine.length-1))
  }
	
	//出力
    // console.log(inArray);
	
}
//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
Main(require("fs").readFileSync("/dev/stdin", "utf8"));