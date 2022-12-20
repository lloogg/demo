#include <iostream>
using namespace std;
// 函数模板：参数的类型不具体指定，用通用类型代替，在调用时，编译器会根据实参的类型推导出形参的类型

template <class T>
void swap_temp(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}
int main()
{
    int a = 1;
    int b = 2;
    swap_temp(a, b);
    cout << a << " " << b << endl;
}