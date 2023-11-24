package Day5;

public class P512 {
 
    public static void main(String[] args) {
        int data[][] = new int[3][3];
        int m,n;
        //  二次元配列に値を代入
        for(m = 0; m < data.length; m++){
            for(n = 0; n < data[m].length; n++){
                data[m][n] = (int)(Math.random()*9)+1;;
            }
        }
        //  成分の表示
        for(m = 0; m < data.length; m++){
            for(n = 0; n < data[m].length; n++){
                System.out.print(data[m][n]+" ");
            }
            System.out.println();
        }
 
    }
}
