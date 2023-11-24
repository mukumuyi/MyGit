package Day4;
public class P417 {
 
    public static void main(String[] args) {
        char fig;
        for (int i = 1;i <= 9;i++){
            for (int j = 1;j <= 10;j++){
                if (i < j) {
                    fig = '□';
                }else{
                    fig = '■';
                }
                if(j%10 == 0){
                    System.out.println(fig+ " "); 
                }else{
                    System.out.print(fig + " "); 
                }
            }
        }
    }    
}
