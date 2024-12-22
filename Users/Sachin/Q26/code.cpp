        int size = nums.size();
        int k=1;
        for(int i=0;i<size-1;i++){
            if(nums[i+1]!=nums[i]){k++;}
            if(nums[i+1]==nums[i]){nums[i]==-101;}
        }
        if(size>2){
        if(nums[size-1]==nums[size-2]){k++;}
        if(nums[size-1]==nums[size-2]){nums[size-2]==-101;}
        }
        for(int i=0;i<size;i++){
            std::cout<<nums[i];
        }
        for(int i=0;i<size;i++){
            if(nums[i]==-101){
                for(int j=i+1;j<size;j++){
                    int temp = nums[j];
                    nums[j] = nums[i];
                    nums[i] = temp;
                }
            }
        }
        return k;