package Day5;

public class S502 {
    public static void main(String[] args) {
        double[] d = new double[3];
        double sum,avg; //  合計値、平均値を入れる変数
        //  値を代入
        d[0] = 1.2;
        d[1] = 3.7;
        d[2] = 4.1;
        sum = 0.0;
        for(int i = 0; i < d.length; i++){
            System.out.print(d[i] + " ");
            sum += d[i];
       }
       System.out.println();
       avg = sum / 3.0;
       System.out.println("合計値：" + sum);
       System.out.println("平均値：" + avg);
   }
}
