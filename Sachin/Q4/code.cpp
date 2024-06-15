        int counter = 0;
        float arr[2];

        int pl=0;
        int pr=0;

        while(counter<=(nums1.size()+nums2.size())/2){
            if(pl==nums1.size()){arr[0]=arr[1];arr[1]=nums2[pr];pr++;}
            else if(pr==nums2.size()){arr[0]=arr[1];arr[1]=nums1[pl];pl++;}
            else{
            if(nums1[pl]>=nums2[pr] && pl<nums1.size() && pr<nums2.size()){arr[0]=arr[1];arr[1]=nums2[pr];pr++;}
            else if(nums1[pl]<nums2[pr] && pl<nums1.size() && pr<nums2.size()){arr[0]=arr[1];arr[1]=nums1[pl];pl++;}
            }
            counter++;
        }

        if((nums1.size()+nums2.size())%2==0){return (arr[0]+arr[1])/2;}
        else{return arr[1];}