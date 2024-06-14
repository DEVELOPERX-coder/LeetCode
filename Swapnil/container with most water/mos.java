class Solution {
    public int maxArea(int[] height) {
        int lp=0;
        int rp=height.length-1;
        int MaxWater=0;
        while(lp<rp)
        {
            int currheight = Math.min(height[lp],height[rp]);
            int width = rp-lp;
            int currWater = currheight * width;

            MaxWater = Math.max(MaxWater,currWater);

            if(height[lp]<height[rp])
            {
                lp++;
            }
            else
            {
                rp--;
            }
        
        }
        return MaxWater;
    }
}