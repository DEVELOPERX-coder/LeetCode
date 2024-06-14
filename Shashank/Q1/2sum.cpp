class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int , int> numMap;
        int n=nums.size();
        for(int i=0; 1<n ; i++){
            int compliment=target-nums[i];
            if(numMap.count(compliment)){
                return {i,numMap[compliment]};
            }
            numMap[nums[i]]=i;
        }
        return {};
        
    } 
};
