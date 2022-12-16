#include <iostream>
using namespace std;
// 占位参数
// 符号重载的时候会用到
void add(int a, int b, int = 20)
{
    cout << a + b << endl;
}
int main()
{
    add(10, 20);
}