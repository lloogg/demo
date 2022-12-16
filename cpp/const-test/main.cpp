#include <iostream>
using namespace std;
void test1()
{
    // const 修饰的局部变量赋值为常量没有分配内存，在符号表中
    const int a = 10;
    int *p = (int *)&a; // 对 const 修饰的局部变量为常量的变量取地址，会分配一个临时空间 int temp = a; *p = &temp;
    *p = 20;
    cout << a << endl;
    printf("%p %p", (int *)&a, (int *)&a); // 两者不同
}

void test2()
{

    int b = 10;

    // const 修饰的局部变量赋值变量时，局部变量存在栈区
    const int a = b;
    int *p = (int *)&a;
    *p = 20;
    cout << a << endl;
}
struct stu
{
    int a;
    int b;
};
void test3()
{
    // const 修饰的变量为自定义变量时，保存在栈区
    const stu obj = {1, 2};
    stu *p = (stu *)&obj;
    p->a = 3;
    p->b = 4;
    cout << obj.a << " " << obj.b << endl;
}
int main()
{
    test1();
    test2();
    test3();
    return EXIT_SUCCESS;
}