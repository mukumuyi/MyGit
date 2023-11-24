package Day5;

public class P505 {
    public static void main(String[] args) {
        int[] data = new int[10];
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*10)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        System.out.print("3の倍数 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m]%3 ==0){
                System.out.print(data[m]+" ");
            }
        }
        
        System.out.println("");
        System.out.print("3の倍数以外 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m]%3 !=0){
                System.out.print(data[m]+" ");
            }
        }
    }
}
