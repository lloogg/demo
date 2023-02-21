#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
#include <string>
int main()
{

    string str;
    string str1("hello");
    cout << str1.at(1) << endl;
    str1[0] = '?';
    cout << str1 << endl;
}