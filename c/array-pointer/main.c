#include <stdio.h>

void test1()
{
    int a[3][5];
    int(*p)[5]; // 定义了一个数组指针变量p，p指向的是整型的有五个元素的数组
    printf("a=%p\n", a);
    printf("a+1=%p\n", a + 1);
    p = a;
    printf("p=%p\n", p);
    printf("a+1=%p\n", p + 1);
}

int main()
{
    test1();
    return 0;
}