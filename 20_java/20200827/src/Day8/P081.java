package Day8;

public class P081 {

    public static void main(String[] arg){
        int number = 0;
        for (int i = 1;i <= 10;i++){
            for (int j = 1 ;j <= 10;j++){
                if (i != j && Math.sqrt(i * i + j* j) == Math.ceil(Math.sqrt(i * i + j* j))){
                    number = (int) Math.sqrt(i * i + j* j);
                    System.out.println("a="+ i + " b=" + j +" c=" + number); 
                }
            }
        }
    }
    
}