package Day4;
public class Practice409 {
    public static void main(String[] args) {
        int i = 1;
        while (i >= 0 ){
            int num = (int)(Math.random()*100)+1;
            System.out.println("a=" + num);
            if (num%10 == 0){
                System.out.println("finish!!");
                break;
            }
        }
    }    
    
}
