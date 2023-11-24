package Day5;

public class P506 {
    public static void main(String[] args) {
        int[] data = new int[10];
        int intMax = 0;
        int intMin = 10;
        int intSum = 0;
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*10)+1;
            System.out.print(data[m]+" ");
        }
        
        System.out.println("");
        for (int m = 0; m < data.length; m++){
            intSum += data[m];
            if (data[m]>intMax){
                intMax = data[m];
            }
            if (data[m]<intMin){
                intMin = data[m];
            }
        }
        
        System.out.println("max:"+ intMax);
        System.out.println("min:"+ intMin);
        System.out.println("avg:"+ intSum/data.length);
    }
}
