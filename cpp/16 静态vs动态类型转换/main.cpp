#include <iostream>
using namespace std;
/**
 * @brief 静态类型转换用于转换内置的数据类型，与 c 语言的强制类型转换一样
 * static_cast 不能转换没有继承关系的类
 * static_cast 不能转指针
 * @return int
 */

class A
{
};
class B : public A
{
public:
        int a;
};
void test1()
{
        A *a = new A;
        B *b = new B;
        static_cast<B *>(a); // 父转子，不安全
        static_cast<A *>(b); // 子转父，安全
}

void test1()
{
        A *a = new A;
        B *b = new B;
        //        dynamic_cast<B *>(a); // 父转子，不安全，dynamic_cast会直接报错
        dynamic_cast<A *>(b); // 子转父，安全
}
int main()
{
        int a = 1;
        char b = 2;
        double c = 3.14;
        a = static_cast<int>(b);
        cout << a << endl;

        test1();
}