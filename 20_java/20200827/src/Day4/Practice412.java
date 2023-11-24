package Day4;
public class Practice412 {
    public static void main(String[] args) {              
        int num;
        int num_min = 100;
        for (int i = 0;i < 5; i += 1){
            num = (int)(Math.random()*100)+1;
            System.out.println(num);
            if (num_min > num){
                num_min = num;
            }
        }
        System.out.println("num_min:" + num_min);
    }    
    
}
