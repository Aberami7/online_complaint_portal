import java.util.*;
public class zero {
    public static int[] zeroArray(int n,int[] arr)
    {
        int[] arr2=new int[n];
        
        int j=0;
        for(int i=0;i<n;i++)
        {
            if(arr[i]!=0)
            {
                arr2[j]=arr[i];
                j++;
            }
            }
            System.out.println(Arrays.toString(arr2));
            return arr2;
        }
        public static void main(String[] args) {
            int[] arr={3,0,7,0,8};
            int n=arr.length;
            zeroArray(n,arr);
            
        }
        


        }
