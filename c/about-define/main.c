#include <stdio.h>
#define PI 3.1415926
// 带参宏
#define S(a, b) a *b
#define S2(a, b) ((a) * (b))
int main()
{
    printf("%.3lf\n", PI);
    printf("%d\n", S(2 + 8, 4));
    printf("%d\n", S2(2 + 8, 4));
    return 0;
}