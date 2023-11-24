package Day4;
public class Practice403 {
    public static void main(String[] args) {
        int num = (int)(Math.random()*10)+1;
        int i = 0;
        System.out.println("数：" + num);
        //  無限ループ
        do{
            i += 1;
            System.out.print("■");
        }while (i < num);
    }    
    
}
