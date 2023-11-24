package Day6;

public class S601 {
 
    public static void main(String[] args) {
        SC01 s = new SC01();  //  インスタンスの生成
        s.n = 100;          //  フィールドnに値を代入
        s.s = "Hello";      //  フィールドsに値を代入
        int ans = s.add(1,2);           //  メソッドadd()を呼び出し
        String str = s.add("World");    //  メソッドadd()を呼び出し
        System.out.println(ans);        //  呼び出し結果の表示
        System.out.println(str);        //  呼び出し結果の表示
        s.showNum();                    //  メソッドshowNum()を呼び出し
    }
    
}
