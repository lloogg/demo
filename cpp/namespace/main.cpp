#include <iostream>
using namespace std;
namespace A
{
    int a = 10;
    void foo()
    {
        cout << "hello" << endl;
    }
}

namespace B
{
    int a = 20;
}

namespace C
{
    namespace D
    {
        int a = 200;
    } // namespace D

}

// 无名命名空间相当与 static，只能在当前文件使用
namespace
{
    int b = 800;
}

// 命名空间可以取别名
namespace Alias = A;

void fun()
{
    // int a = 100; // 会产生二义性
    using Alias::a;
    cout << a << endl;
}
void fun2()
{
    int a = 1000;
    using namespace Alias;
    cout << a << endl; // 就近原则输出 1000
    foo();
}
int main()
{
    cout << A::a << endl;
    cout << Alias::a << endl;
    cout << B::a << endl;
    cout << C::D::a << endl;
    cout << b << endl;

    fun2();
    return EXIT_SUCCESS;
}