#include <stdio.h>

int main()
{
    int *p1, *p2, temp, a, b;
    p1 = &a;
    p2 = &b;
    printf("请输入 a,b 的值：\n");
    scanf("%d %d", p1, p2);
    temp = *p1;
    *p1 = *p2;
    *p2 = temp;
    printf("a=%d b=%d\n", a, b);
    printf("*p1=%d *p2=%d", *p1, *p2);
    return 0;
}