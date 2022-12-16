#include <iostream>
using namespace std;
// 默认参数与 javascript 类似
void add(int a, int b); // 声明和定义只能一处设置默认参数
void add(int a = 10, int b = 20)
{
    cout << a + b << endl;
}
int main()
{
    add();
}