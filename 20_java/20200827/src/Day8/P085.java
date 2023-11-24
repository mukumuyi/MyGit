package Day8;

public class P085 {

    public static void main(String[] arg){
        for (int i = 1;i <= 100;i++){
            if(i%3==0 || String.valueOf(i).indexOf("3") >= 0){
                System.out.println(i);
            }
        }
    }
    
}