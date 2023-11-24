package Day4;
public class P414 {
 
    public static void main(String[] args) {
        int num = (int)(Math.random()*10)+1;
        System.out.println("数：" + num);
        if (num%2 == 0){
            for (int i = 0;i < num;i++){
                System.out.print("★ ");
            }
        }else{
            for (int i = 0;i < num;i++){
                System.out.print("☆ ");
            }
        }
    }    
}
