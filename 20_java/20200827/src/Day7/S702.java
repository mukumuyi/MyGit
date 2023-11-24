package Day7;

public class S702 {
 
    public static void main(String[] args) {
        //  引数つきコンストラクタの呼び出し
        SC03 s = new SC03("HelloWorld.");
        //SC03 s = new SC03();
        //  numberのセッターで、値を設定
        s.setNumber(100);
        //  ゲッターで値を呼び出し、内容を表示
        System.out.println(s.getNumber());
        System.out.println(s.getStr());
    }
    
}
