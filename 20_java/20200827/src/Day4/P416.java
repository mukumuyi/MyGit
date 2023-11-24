package Day4;
public class P416 {
 
    public static void main(String[] args) {
        for (int i = 1;i <= 9;i++){
            for (int j = 1;j <= 9;j++){
                if(j==9){
                    System.out.println(j + "*"+ i + "=" + (j*i)+" "); 
                }else{
                    System.out.print(j + "*"+ i + "=" + (j*i)+" "); 
                }
            }
        }
    }    
}
