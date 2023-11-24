package Day5;

public class P510 {
    public static void main(String[] args) {
        int[] data = new int[7];
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*10)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        System.out.println("");

        for (int m = 0; m < data.length; m++){
            for (int i = 0;i < data[m];i++){
                System.out.print("*");
            }
            System.out.println("");
        }
        
    }
}
