package Day5;

public class P501 {
    public static void main(String[] args) {
        int[] a = new int[7];
        for(int m = 0; m < a.length; m++){
            a[m] = (int)(Math.random()*10)+1;
            System.out.print("a["+m+"]="+a[m]+" ");
        }
    }
}
