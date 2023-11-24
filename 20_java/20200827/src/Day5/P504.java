package Day5;

public class P504 {
    public static void main(String[] args) {
        int[] data = new int[10];
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*100)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        System.out.print("50以上の数 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m] >= 50){
                System.out.print(data[m]+" ");
            }
        }
        
        System.out.println("");
        System.out.print("50未満の数 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m] < 50){
                System.out.print(data[m]+" ");
            }
        }
    }
}
