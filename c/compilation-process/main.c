#include <stdio.h>
// 编译过程
/**
 * 1. 预处理
 * 2.编译
 * 3.汇编
 * 4.链接
 *
 */
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