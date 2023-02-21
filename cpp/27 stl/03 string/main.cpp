#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main()
{

    string str;
    string str1("hello");
    string str2(str1);
    string str3(5, 'k');
    str.assign(5, 'n');
    str.assign(str2, 2, 2); // 把字符串 str2 的从 2 开始的 2 个字符赋给 str
    cout << str << endl;
    cout << str1 << endl;
    cout << str2 << endl;
    cout << str3 << endl;
}