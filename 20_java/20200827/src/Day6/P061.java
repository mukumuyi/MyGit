package Day6;

public class P061 {
 
    public static void main(String[] args) {
        MinMax m = new MinMax();
        int a = 4,b = 2,c=5;
        System.out.println(a + "と" + b + "と" + c + "のうち、最大のものは" + m.max(a,b,c));
        System.out.println(a + "と" + b + "と" + c + "のうち、最小のものは" + m.min(a,b,c));
 
    }
    
}
