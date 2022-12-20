#include <iostream>
#include <string>
using namespace std;
// 函数模板可以像普通函数一样被重载
// 函数模板如果又更好的匹配，可以优先匹配
template <class T>
void MyAdd(T &a, T &b)
{
    cout << "模板函数" << endl;
}


// c++ 会优先考虑普通函数

void MyAdd(int a, int b)
{
    cout << "普通函数" << endl;
}

int main()
{
    int a = 1;
    char b = 2;
    char c = 3;
    MyAdd(a, a);      // 调用普通函数，不用推导
    MyAdd(a, b);      // 调用普通函数，char 类型自动转换成 int 型
    MyAdd<>(a, a);    // 指定调用模板函数
    MyAdd<int>(a, a); // 指定调用模板函数
    // MyAdd<int>(a, b); // 函数模板不允许自动类型转换
    MyAdd(b, c); // 函数模板如果又更好的匹配，可以优先匹配，不需要将 char 类型转成 int 型
}
// 函数模板的本质是二次编译
// 第一次对函数模板进行编译，第二次在调用处对函数模板展开，进行二次编译