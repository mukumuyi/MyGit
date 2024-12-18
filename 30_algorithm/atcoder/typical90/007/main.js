function Check(X,N1,A1){
    console.log("X : " + X,"N :" + N1, "A :" + A1,"Length : " + A1.length)
    const N2 = Math.ceil(N1 / 2)

    if(A1.length == 2){
        return Math.abs(A1[0]-X) > Math.abs(A1[1]-X) ?
        Math.abs(A1[1]-X) : Math.abs(A1[0]-X)
        // return (Math.min(Math.abs(A[0]-X))
    }
    if(A1.length < 2){
        return Math.abs(A1[0]-X) 
    }

    if(A1[N2 - 1] <= X & A1[N2] >= X){
        return (X - A1[N2 - 1]) > (A1[N2]-X) ? (A1[N2]-X) : (X - A1[N2 - 1])       
    } else if(A1[N2 - 1] > X){
        return Math.min((A1[N2 - 1] - X),Check(X,N2,A1.slice(0,N2)))
    } else {
        return  Math.min((X - A1[N2 - 1]),Check(X,N1-N2,A1.slice(N2,N1)))
    }

}


function Main(input) {
    const inputArray = input.split("\n");
    const N = parseInt(inputArray[0]);
    const A = inputArray[1].split(" ").map(Number).sort((a, b) => a - b);
    // const A = inputArray[1].split(" ").sort((a, b) => a - b);
    const Q = parseInt(inputArray[2]);
    const B = []
    for (let i = 0;i < Q ;i++){
        B[i] = parseInt(inputArray[i+3])
        let left = 0;
        let right = N-1;
        let mid;
        if(B[i] < A[left]) {console.log(A[left] - B[i])}
        else if(B[i] > A[right]) {console.log(B[i] - A[right])}
        else {
            while (left <= right){
                mid = Math.ceil((left + right) / 2)
                // console.log(left,mid,right,B[i],A[mid])
                if(A[mid] == B[i]){console.log(0);break}
                if(A[mid] > B[i] & B[i] > A[mid - 1]) {console.log(Math.min((A[mid] - B[i]),(B[i] - A[mid-1])));break}
                if(A[mid + 1] > B[i] & B[i] > A[mid]) {console.log(Math.min((A[mid + 1] - B[i]),(B[i] - A[mid])));break}
                if(A[mid - 1] >= B[i]) {right = mid - 1}
                if(A[mid + 1] <= B[i]) {left = mid + 1}
            }
        }
        
        // console.log(Check(parseInt(inputArray[i+3]),N,A))
        // console.log(Check((inputArray[i+3]),N,A))
    }
    // console.log(N)
    // console.log(A)
    // console.log(Q)
    // console.log(B)
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
