#include <iostream>
using namespace std;

int main()
{
    int a = 10;
    // 常量引用，const 修饰的是引用，不能通过引用去修改引用的这块空间的内容
    const int &b = a;
    // 不能通过引用去修改引用的这块空间的内容
    // b = 100;
}