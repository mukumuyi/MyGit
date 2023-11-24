package Day6;

public class MinMax {
    
    //  最大値の取得
    public int max(int n1,int n2,int n3){
        if (n1 > n2 && n1> n3){
            return n1;
        }else if (n2 > n1 && n2> n3){
            return n2;
        }
        return n3;
    }
    //  最大値の取得
    public int min(int n1,int n2,int n3){
        if (n1 < n2 && n1< n3){
            return n1;
        }else if (n2 < n1 && n2< n3){
            return n2;
        }
        return n3;
    }
}
