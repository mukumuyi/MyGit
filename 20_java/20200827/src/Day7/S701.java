package Day7;

public class S701 {
 
    public static void main(String[] args) {
        SC02 s = new SC02();
        //  method1()は、privateなので、外部からはアクセスできない。
        //s.method1();
        //  method2呼び出し
        s.method2();
        //  method3呼び出し
        s.method3();
        //numは、privateフィールドなので、外部からはアクセスできない。
        //s.num = 1;
    }
    
}
