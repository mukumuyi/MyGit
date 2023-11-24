package Day6;

public class SC01 {
    //  フィールド
    int n = 10;
    String s = "field";
    //  メソッド
    int add(int a,int b){
        return a + b;
    }
    String add(String s){
        return this.s + s;
    }
    void showNum(){
        System.out.println("n = " + n);
    }
    
}
