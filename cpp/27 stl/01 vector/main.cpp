#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;


void print(int value) {
    cout << value << endl;
}
int main()
{
    vector<int> v;
    v.push_back(1);
    v.push_back(3);
    v.push_back(41);
    v.push_back(8);
    vector<int>::iterator v_start = v.begin();
    vector<int>::iterator v_end= v.end();

    while(v_start != v_end) {
        cout << *v_start << endl;
        v_start++;
    }

    for_each(v.begin(), v.end(), print);
}