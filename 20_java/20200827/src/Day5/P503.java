package Day5;

public class P503 {
    public static void main(String[] args) {
        int[] data = new int[10];
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*100)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        System.out.print("奇数 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m]%2 ==1){
                System.out.print(data[m]+" ");
            }
        }
        
        System.out.println("");
        System.out.print("偶数 : ");
        for (int m = 0; m < data.length; m++){
            if (data[m]%2 ==0){
                System.out.print(data[m]+" ");
            }
        }
    }
}
