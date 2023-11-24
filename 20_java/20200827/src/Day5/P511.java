package Day5;

public class P511 {
    public static void main(String[] args) {
        int[] data = new int[5];
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*100)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        System.out.print("0以上60未満 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m] >= 0 && data[m] < 60){
                System.out.print(data[m]+" ");
            }
        }
        
        System.out.println("");
        System.out.print("60以上80未満 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m] >= 60 && data[m] < 80){
                System.out.print(data[m]+" ");
            }
        }

        System.out.println("");
        System.out.print("80以上 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m] >= 80){
                System.out.print(data[m]+" ");
            }
        }
    }
}
