package Day4;
public class Practice413 {
 
    public static void main(String[] args) {
        int num = (int)(Math.random()*10)+1;
        System.out.println("数：" + num);
        //  無限ループ
        if (num >= 5){
            for (int i = 0;i < num;i++){
                System.out.print("■");
            }
        }else{
            System.out.print("num:" + num);
        }
    }    
}
