package Day4;
public class Practice402 {
    public static void main(String[] args) {
        int num = (int)(Math.random()*10)+1;
        int i = 0;
        System.out.println("数：" + num);
        //  無限ループ
        while (i < num){
            i += 1;
            System.out.print("■");
        }
    }    
    
}
