#include <stdio.h>
int main()
{
    int a = 100;
    int *p, q = &a; // q 不是指针变量
    int **pp = &p;
    printf("%p\n", p);
    printf("%d\n", *p);
    printf("%p\n", pp);
    // *pp = p;
    printf("%p\n", *pp);

    return 0;
}