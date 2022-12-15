#include <stdio.h>

int main()
{
    int a[32] = {0};
    int *p = a;
    p[10] = 100;
    *(p + 2) = 20;
    for (int i = 0; i < 32; i++)
    {
        printf("%d\n", a[i]);
    }
}