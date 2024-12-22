class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        if(digits[digits.size()-1]!=9){
            digits[digits.size()-1]++;
        }
        else if(digits[0]==9){
            int i=digits.size()-1;
            while(i>0){
                if((digits[i]==9 && i==digits.size()-1)|| digits[i]==10){
                    digits[i-1]++;
                    digits[i]=0;
                    i--;
                }
                else{
                    if(digits[i]==9){break;}
                    //digits[i]++;
                    break;
                }
            }
            if(digits[0]==10 || digits.size()==1){
                std::vector<int> newD;
                newD.insert(newD.begin()+0,1);
                newD.insert(newD.begin()+1,0);
                for(int j=1;j<digits.size();j++){
                    newD.insert(newD.begin()+j+1,digits[j]);
                }
                return newD;
            }
        }
        else{
            int i=digits.size()-1;
            while(i>0){
                if((digits[i]==9 && i==digits.size()-1) || digits[i]==10){
                    digits[i-1]++;
                    digits[i]=0;
                    i--;
                }
                else{
                    if(digits[i]==9){break;}
                    //digits[i]++;
                    break;
                }
            }
        }
        return digits;
    }
};