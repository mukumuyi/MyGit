package Day8;

public class P083 {

    public static void main(String[] arg){
        int number = 5;
        int result = 1;
        for (int i = number;i >= 1;i--){
            result = result * i;
        }
        System.out.println(result);
    }
    
}