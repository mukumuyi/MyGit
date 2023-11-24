package Day4;
public class Practice411 {
    public static void main(String[] args) {              
        int num;
        int num_max = 0;
        for (int i = 0;i < 5; i += 1){
            num = (int)(Math.random()*100)+1;
            System.out.println(num);
            if (num_max < num){
                num_max = num;
            }
        }
        System.out.println("num_max:" + num_max);
    }    
    
}
