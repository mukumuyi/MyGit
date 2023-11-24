package Day5;

public class S503 {
    public static void main(String[] args) {
        int n[] = { 5,4,3,2,1 };
        String s[] = {"ABC","DEF","GHI" };
        int i;
        //  整数型配列変数nの成分表示
        for(i = 0; i < n.length; i++){
            System.out.print(n[i]+" ");
        }
        System.out.println();
        //  文字列型配列変数nの成分表示
        for(i = 0; i < s.length; i++){
            System.out.print(s[i]+" ");
        }
        System.out.println();
    }
}
