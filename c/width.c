#include <stdio.h>
int main(int argc, char *argv[])
{
    int a = 34234;
    float pi = 3.678f;
    // 右对齐
    printf("%8d\n", a);
    printf("%08d\n", a);
    // 左对齐
    printf("%-8d\n", a);

    // 两位小数，四舍五入
    printf("%.2f", pi);
    return 0;
}