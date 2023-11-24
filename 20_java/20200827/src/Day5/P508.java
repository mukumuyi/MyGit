package Day5;

public class P508 {
    public static void main(String[] args) {
        int[] data = new int[5];
        int intMax = 0;
        int intMin = 10;
        int intSum = 0;
        int intCntUpper = 0;
        int intCntUnder = 0;
        int intCntEqual = 0;
        for(int m = 0; m < data.length; m++){
            data[m] = (int)(Math.random()*21)-10;
            System.out.print(data[m]+" ");
            //intSum += data[m];
        }
        System.out.println("");
        //System.out.println("sum:"+ intSum);
        //System.out.println("avg:"+ intSum/data.length);
        
        //System.out.print("UpperAvg:");

        for (int m = 0; m < data.length; m++){
            if (data[m] > 0){
                //System.out.print(data[m]+" ");
                intCntUpper += 1;
            }else if (data[m] < 0){
                intCntUnder += 1;
            }else{
                intCntEqual +=1;
            }
        }
        
        System.out.println("intCntUpper " + intCntUpper);
        System.out.println("intCntUnder " + intCntUnder);
        System.out.println("intCntEqual " + intCntEqual);

        //System.out.println("");
        //System.out.print("UnderAvg:");

        for (int m = 0; m < data.length; m++){
            if (data[m] < intSum/data.length){
                //System.out.print(data[m]+" ");
            }
        }

        System.out.println("");
        for (int m = 0; m < data.length; m++){
            if (data[m]>intMax){
                intMax = data[m];
            }
            if (data[m]<intMin){
                intMin = data[m];
            }
        }
        
        //System.out.println("max:"+ intMax);
        //System.out.println("min:"+ intMin);
        //System.out.println("avg:"+ intSum/data.length);
    }
}
