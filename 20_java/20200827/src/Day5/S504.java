package Day5;

public class S504 {
 
    public static void main(String[] args) {
        int a[][] = new int[3][4];
        int m,n;
        //  二次元配列に値を代入
        for(m = 0; m < a.length; m++){
            for(n = 0; n < a[m].length; n++){
                a[m][n] = m+n;
            }
        }
        //  成分の表示
        for(m = 0; m < a.length; m++){
            for(n = 0; n < a[m].length; n++){
                System.out.print(a[m][n]+" ");
            }
            System.out.println();
        }
 
    }
}
