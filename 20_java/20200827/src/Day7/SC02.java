package Day7;

public class SC02 {
 
    //  コンストラクタ
    public SC02(){
        System.out.println("コンストラクタ");
    }
    //  privateメソッド
    private void method1(){
        System.out.println("method1(private)");
    }
    //  publicメソッド①
    public void method2(){
        System.out.println("method2(public)");
    }
    //  publicメソッド②
    public void method3(){
        //  privateメソッドの呼び出し
        method1();
        System.out.println("method3(public) : num=" + this.num);
    }
    //  privateフィールド
    private int num = 1;
    
}
