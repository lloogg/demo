#include <stdio.h>
// c语言规定函数的名字就是函数的入口地址
// 可以定义一个指针变量来存放函数的地址
int f(int a, int b)
{
    return a + b;
}
int f2(int a, int b)
{
}
int main()
{
    int (*p)(int, int);

    p = f;
    int res = p(3, 5);

    printf("%p\n", p);
    printf("%d\n", res);

    // 函数指针数组
    int (*pa[2])(int, int);
}