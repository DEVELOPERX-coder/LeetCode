class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n1=nums1.size();
        int n2=nums2.size();

        if(n1>n2){
            return findMedianSortedArrays(nums2 , nums1);
            
        }

        int low=0;
        int high = n1;

        while(high>=low){
            int partition1=(low+high)/2;  //partition after middle value
            int partition2= (n1+n2+1)/2 -partition1; //partition after middle value

             //max value on the left side of partition
            int max1=partition1==0?INT_MIN:nums1[partition1-1];
            int max2=partition2==0?INT_MIN:nums2[partition2-1];
             //min value on the right side of partition
            int min1 = (partition1 == n1) ? INT_MAX : nums1[partition1];
            int min2 = (partition2 == n2) ? INT_MAX : nums2[partition2];


    /*        7 12 14 15
        1 2 3 4 9 11               here symmetry is after 7 , max1=7,max2=4,min2=9,min1=12*/
            if(max1<=min2 && min1>=max2){
                if((n1+n2)%2==0){
                    return (max(max1, max2) + min(min1, min2)) / 2.0;
                }else{
                    return double(max(max1,max2));
                }

            }else if(max1>min2){
                high=partition1-1;
            }else {
                low=partition1+1;
            }


        }

    return 0;
    }
};
