int l=0,r=height.size()-1;
        int maxHeight=0;
        while(l<r){
            if(height[l]>height[r]){
                if(height[r]*(r-l)>maxHeight){maxHeight=height[r]*(r-l);}
                r--;
                while(l<r && height[r]<height[r+1]){r--;}
            }
            else{
                if(height[l]*(r-l)>maxHeight){maxHeight=height[l]*(r-l);}
                l++;
                while(l<r && height[l]<height[l-1]){l++;}
            }
        }
        return maxHeight;