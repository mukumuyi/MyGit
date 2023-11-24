using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace Problem2_3
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 1,b = 2,c = 3,d = 4,e = 5;
            a += 2;  //  aに2を加える
            b -= 1;  //  bから1を引く
            c *= 3;  //  cに3をかける
            d /= 2;  //  dを2で割る
            e %= 2;  //  eに、eを2で割った余りを代入する
            Console.WriteLine("a = {0}",a);
            Console.WriteLine("b = {0}",b);
            Console.WriteLine("c = {0}",c);
            Console.WriteLine("d = {0}",d);
            Console.WriteLine("e = {0}",e);
        }
    }
}