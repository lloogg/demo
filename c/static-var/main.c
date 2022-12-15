#include <stdio.h>
// 静态局部变量
// 第一次调用函数的时候，开辟空间赋值，函数结束后，不释放
// 以后再调用函数的时候，就不再为其开辟空间，也不赋初值，用的是以前的那个变量
void p();
int main()
{
    for (int i = 0; i < 100; i++)
    {
        p();
    }
    return 0;
}

void p()
{
    static int num = 0;
    num++;
    printf("%d\n", num);
}