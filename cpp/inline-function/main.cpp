#include <iostream>
using namespace std;
#define ADD(x, y) x + y
#define MYCOMPARE(a, b) a < b ? a : b
// inline 函数解决了宏的易出错问题，也解决了普通函数调用开销的问题
// 内联函数定义和声明必须在一起，否则就和普通函数无异
// 类的成员函数默认编译器会将它变成内联函数
// 内联函数相当于用空间换时间
// 内联函数只是给编译器一个建议，编译器不一定会接受这种建议，C++内联编译有一些限制
inline int Add(int x, int y)
{
    return x + y;
}
int main()
{
    int a = 10, b = 20;
    int c = ADD(a, b) * 5; // 预处理阶段
    int d = Add(a, b) * 5; // 编译阶段
    cout << c << endl;
    cout << d << endl;
    int res = MYCOMPARE(++a, b); // 宏的缺陷
    cout << res << endl;
}