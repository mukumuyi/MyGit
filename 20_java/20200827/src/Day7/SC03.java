package Day7;

public class SC03 {
    //  int型のフィールド(privateで隠ぺいされている）
    private int number = 0;
    //  String型のフィールド(privateで隠されている）
    private String str = "";
    //  コンストラクタ（引数つき）
    public SC03(String str){
        this.str = str;
    }
    //  number変数のセッター
    public void setNumber(int number){
        this.number = number;
    }
    //  number変数のゲッター
    public int getNumber(){
        return this.number;
    }
    //  str変数のゲッター
    public String getStr(){
        return this.str;
    }
    
}
