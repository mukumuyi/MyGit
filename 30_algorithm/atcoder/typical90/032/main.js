const permutation2 = (nums, k) => {
    let ans = [];
    if (nums.length < k) {
        return [];
    }
    if (k === 1) {
        for (let i = 0; i < nums.length; i++) {
            ans[i] = [nums[i]];
            // console.log("ans1 : ",ans)
            count += 1
        }
    } else {
        for (let i = 0; i < nums.length; i++) {
            // let parts = nums.toSpliced(i,1);
            let row = permutation(nums.toSpliced(i,1), k - 1);
            for (let j = 0; j < row.length; j++) {
                ans.push([nums[i]].concat(row[j]));
            }
            // console.log("ans : ",ans)
        }
    }
    return ans
}

const permutation = (nums, k) => {
    
    let ans = [];
    const permute = (arr, depth) => {
        // count += 1
        if (depth === k) {
            ans.push(arr.slice(0, k));  // k個分の部分配列を取得
            // console.log(arr,depth)
            return;
        }
        for (let i = depth; i < arr.length; i++) {
            [arr[depth], arr[i]] = [arr[i], arr[depth]];  // スワップ
            // console.log(arr,depth)
            permute(arr, depth + 1);
            [arr[depth], arr[i]] = [arr[i], arr[depth]];  // 元に戻す
        }
    };

    permute(nums, 0);
    return ans;
};

function Main(input) {
    inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const M = parseInt(inputArray[N + 1]);
    const distanceArray = [];
    const runnerRelateArray = []
    let ng1, ng2;

    for (let i = 0; i < N; i++) {
        distanceArray[i] = inputArray[i + 1].split(" ").map(Number)
        // runnerRelateArray[i] = []
    }

    for (let j = 0; j < M; j++) {
        [ng1, ng2] = inputArray[j + N + 2].split(" ").map(Number)
        runnerRelateArray.push(String(ng1 - 1) + String(ng2 - 1))
        runnerRelateArray.push(String(ng2 - 1) + String(ng1 - 1))
    }

    let temp, flg, tempSum;
    let minSum = 1000000001
    const runner = [...Array(N)].map((_,i)=>i)
    const pattern = permutation(runner,N)

    for(let k=0;k < pattern.length;k++){
        flg = true;
        temp = pattern[k].join("");
        for (let l =0 ;l < runnerRelateArray.length;l++){
            if(temp.includes(runnerRelateArray[l])){
                flg = false
                break;
            }
        }
        if(flg){
            tempSum = 0;
            for(let m =0 ;m < N;m++){
                tempSum += distanceArray[m][temp[m]]
            }
            if(minSum > tempSum){
                minSum = tempSum
            }
        }

    }
    console.log(minSum == 1000000001 ? -1 : minSum)


}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
