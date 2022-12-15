#include <stdio.h>

int main()
{
    int a = 0x1234, b = 0x5678;
    char *p1, *p2;
    int *p3, *p4;
    printf("%#x %#x\n", a, b);
    p1 = (char *)&a;
    p2 = (char *)&b;
    p3 = &a;
    p4 = &b;
    printf("%#x %#x\n", *p1, *p2);
    // 指向下一个 char 类型的数据
    p1++;
    p2++;
    // 字节序
    printf("%#x %#x\n", *p1, *p2);


    printf("%#x %#x\n", *p3, *p4);
    // 指向下一个 int 类型的数据
    p3++;
    p4++;
    printf("%#x %#x\n", *p3, *p4);

    return 0;
}