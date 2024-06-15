
vector<int> o = {-1, -1};
for (int i = 0; i < nums.size(); i++)
{
    for (int j = i + 1; j < nums.size(); j++)
    {
        if (nums[i] + nums[j] == target)
        {
            o[0] = i;
            o[1] = j;
            return o;
            break;
        }
    }
    if (o[0] != -1)
    {
        break;
    }
}
return o;